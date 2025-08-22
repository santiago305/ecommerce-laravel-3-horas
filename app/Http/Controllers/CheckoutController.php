<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function create(Request $request): Response
    {
        $user = $request->user();
        $cart = Cart::where('user_id', $user->getKey())->where('status', 'active')->first();

        $items = $cart
            ? CartItem::with('product')->where('cart_id', $cart->getKey())->get()
            : collect();

        $subtotal = $items->sum(fn($i) => $i->quantity * $i->product->price);
        $igvRate  = 0.18;
        $tax      = round($subtotal * $igvRate, 2);
        $total    = round($subtotal + $tax, 2);

        return Inertia::render('checkout/create', [
            'items'    => $items,
            'subtotal' => $subtotal,
            'tax'      => $tax,
            'total'    => $total,
            'igvRate'  => $igvRate * 100,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        $cart = Cart::where('user_id', $user->getKey())
            ->where('status', 'active')
            ->firstOrFail();

        $items = CartItem::with('product')->where('cart_id', $cart->getKey())->get();
        abort_if($items->isEmpty(), 422, 'El carrito está vacío');

        $igvRate = 0.18;

        $orderId = DB::transaction(function () use ($user, $cart, $items, $igvRate) {
            $subtotal = 0;

            // Bloquear productos y validar stock
            $locked = Product::whereIn('id', $items->pluck('product_id'))
                ->lockForUpdate()->get()
                ->keyBy('id');

            foreach ($items as $ci) {
                $p = $locked[$ci->product_id] ?? null;
                abort_unless($p && $p->is_active, 422, 'Producto no disponible');
                abort_if($p->stock < $ci->quantity, 422, "Stock insuficiente para {$p->name}");
                $subtotal += $ci->quantity * $p->price;
            }

            $tax   = round($subtotal * $igvRate, 2);
            $total = round($subtotal + $tax, 2);

            $order = Order::create([
                'user_id' => $user->getKey(),
                'status'  => 'paid', // o 'pending' si integrarás pasarela luego
                'subtotal'=> $subtotal,
                'tax'     => $tax,
                'total'   => $total,
                'payment_method' => 'cash', // placeholder
                'payment_ref'    => null,
            ]);

            foreach ($items as $ci) {
                $p = $locked[$ci->product_id];
                OrderItem::create([
                    'order_id'   => $order->getKey(),
                    'product_id' => $p->getKey(),
                    'quantity'   => $ci->quantity,
                    'unit_price' => $p->price,
                    'tax_rate'   => $igvRate * 100,
                    'total_line' => round(($p->price * $ci->quantity) * (1 + $igvRate), 2),
                ]);

                // Descontar stock
                $p->decrement('stock', $ci->quantity);
            }

            // Cerrar carrito
            $cart->update(['status' => 'checked_out']);
            // Vaciar items (opcional; al cerrar el carrito, ya no se usa)
            CartItem::where('cart_id', $cart->getKey())->delete();

            return $order->getKey();
        });

        return redirect()->route('account.orders.show', $orderId)->with('status', 'order-created');
    }
}
