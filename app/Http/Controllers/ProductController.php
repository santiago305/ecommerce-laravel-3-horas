<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $q = $request->string('q');
        $products = Product::query()
            ->where('is_active', true)
            ->when($q->isNotEmpty(), fn($qb) =>
                $qb->where('name', 'ilike', '%'.$q.'%'))
            ->orderBy('created_at', 'desc')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => $products,
            'filters'  => ['q' => $q->toString()],
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }

    public function suggest(Request $request)
    {
        $q = $request->string('q');

        $products = Product::query()
            ->where('is_active', true)
            ->when($q->isNotEmpty(), fn($qb) =>
                $qb->where('name', 'ilike', '%'.$q.'%'))
            ->orderByDesc('created_at')
            ->limit(5)
            ->get(['id','name']);

        return response()->json($products);
    }
}
