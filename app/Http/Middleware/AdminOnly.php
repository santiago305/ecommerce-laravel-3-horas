<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminOnly
{
    public function handle(Request $request, Closure $next)
    {
        // Si no está logueado, redirige a login (por seguridad)
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // Si está logueado pero NO es admin
        if ($request->user()->role !== 'admin') {
            // Para AJAX/API (Accept: application/json), mejor 403
            if ($request->expectsJson()) {
                abort(403, 'No autorizado.');
            }

            // Para peticiones web normales, redirige a Home con un flash
            return redirect()
                ->route('home')
                ->with('status', 'No tienes permisos de administrador.');
        }

        // Es admin ✔️
        return $next($request);
    }
}
