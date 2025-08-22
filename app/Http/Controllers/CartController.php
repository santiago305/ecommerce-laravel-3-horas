<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    protected function activeCartId(string $userId): string
    {
        return Cart::query()
            ->firstOrCreate(['user_id' => $userId, 'status' => 'active'])
            ->getKey();
    }

    public function show(Request $request): Response
    {
        $userId = $request->user()->getKey();
        $cartId = $this->activeCartId($userId);

        $items = CartItem::with('product')
            ->where('cart_id', $cartId)
            ->get();

        return Inertia::render('Cart/show', [
            'items' => $items,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'product_id' => 'required|uuid|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product = Product::where('is_active', true)->findOrFail($data['product_id']);

        $userId = $request->user()->getKey();
        $cartId = $this->activeCartId($userId);

        $item = CartItem::firstOrNew([
            'cart_id'    => $cartId,
            'product_id' => $product->getKey(),
        ]);

        $item->quantity = ($item->exists ? $item->quantity : 0) + (int)$data['quantity'];
        $item->save();

        return back()->with('status', 'added-to-cart');
    }

    public function update(Request $request, CartItem $item): RedirectResponse
    {
        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = $request->user()->getKey();
        $cartId = $this->activeCartId($userId);
        abort_unless($item->cart_id === $cartId, 403);

        $item->update(['quantity' => (int)$data['quantity']]);
        return back()->with('status', 'cart-updated');
    }

    public function destroy(Request $request, CartItem $item): RedirectResponse
    {
        $userId = $request->user()->getKey();
        $cartId = $this->activeCartId($userId);
        abort_unless($item->cart_id === $cartId, 403);

        $item->delete();
        return back()->with('status', 'item-removed');
    }
}
