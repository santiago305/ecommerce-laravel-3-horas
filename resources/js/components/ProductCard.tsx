import React from 'react';
import { useForm, Link, usePage, router } from '@inertiajs/react';
import { Product, currency } from '@/types/types';
import { path } from '@/lib/routes';

export default function ProductCard({ p }: { p: Product }) {
  const { post, processing, data } = useForm({ product_id: p.id, quantity: 1 });
  const { props } = usePage<{ auth?: { user?: any } }>();
  const isAuth = !!props?.auth?.user;

  const onAdd = () => {
    if (!isAuth) {
      router.visit(`${path.login}?redirect=${encodeURIComponent(path.product(p.id))}`);
      return;
    }
    post(path.cartItemsStore, {
      preserveScroll: true,
      onSuccess: () => {
        // 🔔 Avisar al header que se agregó al carrito
        window.dispatchEvent(new CustomEvent('cart:added', {
          detail: { qty: Number(data.quantity) || 1 }
        }));
      },
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card">
      <Link href={path.product(p.id)}>
        <img
          src={`https://picsum.photos/seed/${p.id}/600/400`}
          alt={p.name}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-2 p-4">
        <Link href={path.product(p.id)} className="line-clamp-2 font-medium tracking-tight">{p.name}</Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{currency(p.price)}</span>
          <button
            onClick={onAdd}
            disabled={processing || !p.is_active || p.stock <= 0}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
