<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $q = $request->string('q');
        $products = Product::query()
            ->when($q->isNotEmpty(), fn($qb) => $qb->where('name', 'ilike', '%'.$q.'%'))
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'filters'  => ['q' => $q->toString()],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name'        => 'required|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'is_active'   => 'required|boolean',
        ]);

        Product::create($data);
        return redirect()->route('admin.products.index')->with('status', 'product-created');
    }

    public function show(Product $product): Response
    {
        return Inertia::render('admin/products/show', ['product' => $product]);
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('admin/products/edit', ['product' => $product]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'name'        => 'required|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'is_active'   => 'required|boolean',
        ]);

        $product->update($data);
        return redirect()->route('admin.products.index')->with('status', 'product-updated');
    }

    public function destroy(Product $product): RedirectResponse
    {
        // Revisar si el producto ya está en algún pedido
        if ($product->orderItems()->exists()) {
            return back()->with('status', 'product-has-orders');
        }

        // (opcional) Revisar si está en algún carrito activo
        if ($product->cartItems()->exists()) {
            return back()->with('status', 'product-in-carts');
        }

        // Si no está en pedidos ni carritos, eliminar
        $product->delete();

        return redirect()
            ->route('admin.products.index')
            ->with('status', 'product-deleted');
    }

}
