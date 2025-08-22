<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'products' => Product::count(),
            'orders'   => Order::count(),
            'sales'    => Order::where('status', 'paid')->sum('total'),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}
