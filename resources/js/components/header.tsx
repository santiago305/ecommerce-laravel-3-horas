import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { path } from '@/lib/routes';
import type { Product } from '@/types/types';

export default function Header({ cartCount = 0, defaultQ = '' }: { cartCount?: number; defaultQ?: string }) {
  const [q, setQ] = useState(defaultQ);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 👇 leemos el count del servidor compartido por Inertia
  const { props } = usePage<{ auth?: { user?: any }, cart?: { count: number } }>();
  const isAuth = !!props?.auth?.user;
  const serverCount = typeof props?.cart?.count === 'number' ? props.cart.count : cartCount;

  // 🧮 estado local para reactividad instantánea
  const [cartQty, setCartQty] = useState<number>(serverCount);

  // Si el servidor manda un nuevo count (tras cualquier navegación), sincronizamos:
  useEffect(() => {
    setCartQty(serverCount);
  }, [serverCount]);

  // Escuchar “cart:added” para incrementar en vivo
  useEffect(() => {
    const handler = (e: any) => {
      const inc = Number(e?.detail?.qty) || 1;
      setCartQty((n) => n + inc);
    };
    window.addEventListener('cart:added', handler as EventListener);
    return () => window.removeEventListener('cart:added', handler as EventListener);
  }, []);

  useEffect(() => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(() => {
      fetch(`/products/suggest?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data));
    }, 300);
    return () => clearTimeout(timeout);
  }, [q]);

  useEffect(() => {
    const handler = (e: any) => {
        const val = Number(e?.detail?.count);
        if (!Number.isNaN(val)) setCartQty(val);
    };
    window.addEventListener('cart:set', handler as EventListener);
    return () => window.removeEventListener('cart:set', handler as EventListener);
    }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href={path.home} className="text-lg font-semibold tracking-tight">Arcángel</Link>

        <div className="relative hidden min-w-[360px] max-w-xl flex-1 md:block">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.visit(path.products, { method: 'get', data: { q } });
              setShowDropdown(false);
            }}
          >
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setShowDropdown(true); }}
              placeholder="Buscar productos…"
              name="q"
              className="h-11 w-full rounded-2xl border bg-background px-4 outline-none ring-0 focus-visible:border-foreground/30"
            />
          </form>

          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-50 mt-1 w-full rounded-2xl border bg-card shadow-lg">
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  href={path.product(p.id)}
                  className="block px-4 py-2 hover:bg-muted"
                  onClick={() => setShowDropdown(false)}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav className="flex items-center gap-3">
          {!isAuth && (
            <Link href={path.login} className="rounded-xl border px-3 py-2 hover:bg-muted">
              Login
            </Link>
          )}
          <Link href={path.products} className="rounded-xl border px-3 py-2 hover:bg-muted">Productos</Link>

          <Link href={path.cart} className="relative rounded-xl border px-3 py-2 hover:bg-muted">
            Carrito
            {cartQty > 0 && (
              <span
                className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] leading-none text-background"
                aria-label={`Carrito con ${cartQty} ${cartQty === 1 ? 'producto' : 'productos'}`}
              >
                {cartQty}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
