<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Traemos los 10 productos más recientes que estén activos
        $products = Product::query()
            ->where('is_active', true)
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('welcome', [
            'products' => $products,
        ]);
    }
}
