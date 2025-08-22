<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
/*
|--------------------------------------------------------------------------
| Rutas públicas
|--------------------------------------------------------------------------
*/
Route::get('/',[HomeController::class, 'index'])->name('home');

Route::get('/products', [ProductController::class, 'index'])
    ->name('products.index');

Route::get('/products/{product}', [ProductController::class, 'show'])
    ->whereUuid('product') // si usas UUID como id
    ->name('products.show');

Route::get('/products/suggest', [ProductController::class, 'suggest'])->name('products.suggest');

/*
|--------------------------------------------------------------------------
| Zona de clientes autenticados (mantener por compatibilidad con scaffolding)
| - Si eres cliente y vas a comprar o entrar aun carrito
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cart', [CartController::class, 'show'])->name('cart.show');
    Route::post('/cart/items', [CartController::class, 'store'])->name('cart.items.store');          // añadir al carrito
    Route::patch('/cart/items/{item}', [CartController::class, 'update'])->whereUuid('item')->name('cart.items.update');
    Route::delete('/cart/items/{item}', [CartController::class, 'destroy'])->whereUuid('item')->name('cart.items.destroy');

    // Checkout
    Route::get('/checkout', [CheckoutController::class, 'create'])->name('checkout.create');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    // Cuenta (pedidos)
    Route::get('/account/orders', [AccountController::class, 'orders'])->name('account.orders.index');
    Route::get('/account/orders/{order}', [AccountController::class, 'showOrder'])
        ->whereUuid('order')
        ->name('account.orders.show');

});;

/*
|--------------------------------------------------------------------------
| Dashboard (mantener por compatibilidad con scaffolding)
| - Si es admin: redirige al panel admin.
| - Si es cliente: muestra su dashboard de cuenta.
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // Dashboard
        Route::get('dashboard', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        // Productos (CRUD)
        Route::get('products',               [AdminProductController::class, 'index'])->name('products.index');
        Route::get('products/create',        [AdminProductController::class, 'create'])->name('products.create');
        Route::post('products',              [AdminProductController::class, 'store'])->name('products.store');

        Route::get('products/{product}',     [AdminProductController::class, 'show'])
            ->whereUuid('product')->name('products.show');

        Route::get('products/{product}/edit',[AdminProductController::class, 'edit'])
            ->whereUuid('product')->name('products.edit');

        Route::put('products/{product}',     [AdminProductController::class, 'update'])
            ->whereUuid('product')->name('products.update');

        Route::delete('products/{product}',  [AdminProductController::class, 'destroy'])
            ->whereUuid('product')->name('products.destroy');

        // Pedidos (listar/ver/actualizar estado)
        Route::get('orders',                 [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('orders/{order}',         [AdminOrderController::class, 'show'])
            ->whereUuid('order')->name('orders.show');
        Route::patch('orders/{order}',       [AdminOrderController::class, 'update'])
            ->whereUuid('order')->name('orders.update');
    });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
