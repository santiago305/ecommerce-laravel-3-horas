<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function orders(Request $request): Response
    {
        $orders = Order::where('user_id', $request->user()->getKey())
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('account/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function showOrder(Request $request, Order $order): Response
    {
        abort_unless($order->user_id === $request->user()->getKey(), 403);

        $order->load(['items.product']); // define relación items->product en el modelo
        return Inertia::render('account/orders/show', [
            'order' => $order,
        ]);
    }
}
