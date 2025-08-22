<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\CartItem;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Inertia::share('auth', function () {
            $u = Auth::user();
            return [
                'user' => $u ? [
                    'id'    => $u->id,
                    'name'  => $u->name,
                    'email' => $u->email,
                ] : null,
            ];
        });

        // 👇 compartimos el contador del carrito en todas las respuestas
        Inertia::share('cart', function () {
            $u = Auth::user();
            if (!$u) {
                return ['count' => 0];
            }

            // Suma de cantidades del carrito ACTIVO del usuario
            $count = CartItem::whereHas('cart', function ($q) use ($u) {
                    $q->where('user_id', $u->getKey())
                      ->where('status', 'active');
                })
                ->sum('quantity');

            return ['count' => (int)$count];
        });
    }
}
