<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->string('status');
        $orders = Order::with('user')
            ->when($status->isNotEmpty(), fn($q) => $q->where('status', $status))
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters'=> ['status' => $status->toString()],
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load(['user', 'items.product']);
        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $data = $request->validate([
            'status' => 'required|in:pending,paid,cancelled,refunded',
        ]);

        $order->update(['status' => $data['status']]);
        return back()->with('status', 'order-updated');
    }
}
