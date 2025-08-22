import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Link, useForm, usePage } from '@inertiajs/react';
import type { CartItemDTO } from '@/types/types';
import { currency } from '@/types/types';
import { path } from '@/lib/routes';

const IGV_RATE = 0.18; // solo para mostrar totales en el carrito

type Props = {
  items: CartItemDTO[];
};

export default function Show({ items }: Props) {
  // Mantener estado local para UI instantánea (sin esperar navegación)
  const [rows, setRows] = useState<CartItemDTO[]>(items);

  // Si Inertia refresca props (tras patch/delete), sincronizamos el estado local
  useEffect(() => {
    setRows(items);
  }, [items]);

  const subtotal = useMemo(
    () => rows.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0),
    [rows]
  );
  const tax = useMemo(() => Math.round(subtotal * IGV_RATE * 100) / 100, [subtotal]);
  const total = useMemo(() => Math.round((subtotal + tax) * 100) / 100, [subtotal, tax]);
  const totalQty = useMemo(() => rows.reduce((s, i) => s + i.quantity, 0), [rows]);

  // Enviar evento para actualizar el badge del Header cuando cambie la lista
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('cart:set', { detail: { count: totalQty } }));
  }, [totalQty]);

  // Checkout: crear la orden
  const { post, processing } = useForm({});
  const page = usePage<{ flash?: { type?: 'success' | 'error'; message?: string } }>();

  const handleCheckout = () => {
    post(path.checkoutStore, {
      preserveScroll: true,
    });
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header cartCount={totalQty} />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="mb-6 text-2xl font-semibold">Tu carrito</h1>

        {/* Banner flash */}
        {page.props.flash?.message && (
          <div
            className={`mb-4 rounded-xl border p-3 text-sm ${
              page.props.flash.type === 'success'
                ? 'border-green-300 bg-green-50 text-green-800'
                : 'border-red-300 bg-red-50 text-red-800'
            }`}
          >
            {page.props.flash.message}
          </div>
        )}

        {rows.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section className="space-y-4 lg:col-span-2">
              {rows.map((item) => (
                <CartRow
                  key={item.id}
                  item={item}
                  onLocalChange={(next) => {
                    setRows((prev) => prev.map((r) => (r.id === next.id ? next : r)));
                  }}
                  onLocalRemove={(id) => {
                    setRows((prev) => prev.filter((r) => r.id !== id));
                  }}
                />
              ))}
            </section>

            <aside className="h-fit rounded-2xl border p-4">
              <h2 className="mb-3 text-lg font-semibold">Resumen</h2>
              <div className="space-y-1 text-sm">
                <Row label="Subtotal" value={currency(subtotal)} />
                <Row label={`IGV (${Math.round(IGV_RATE * 100)}%)`} value={currency(tax)} muted />
                <Row label="Total" value={currency(total)} bold className="pt-2" />
              </div>

              <button
                onClick={handleCheckout}
                disabled={processing || rows.length === 0}
                className="mt-4 block w-full rounded-xl bg-foreground px-5 py-3 text-center font-medium text-background hover:opacity-90 disabled:opacity-50"
              >
                {processing ? 'Procesando…' : 'Ir a pagar'}
              </button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Los costos de envío o descuentos se aplican en el siguiente paso.
              </p>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ----------------------------- Subcomponentes ---------------------------- */

function Row({
  label,
  value,
  bold,
  muted,
  className = '',
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className={`${muted ? 'text-muted-foreground' : ''}`}>{label}</span>
      <span className={`${bold ? 'text-lg font-semibold' : 'font-medium'}`}>{value}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-2xl border py-16 text-center">
      <div className="mx-auto max-w-sm">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border text-xl">🛒</div>
        <h2 className="text-lg font-semibold">Tu carrito está vacío</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Explora nuestros productos y añade tus favoritos.
        </p>
        <Link
          href={path.products}
          className="mt-5 inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-muted"
        >
          Ver productos
        </Link>
      </div>
    </div>
  );
}

function CartRow({
  item,
  onLocalChange,
  onLocalRemove,
}: {
  item: CartItemDTO;
  onLocalChange: (next: CartItemDTO) => void;
  onLocalRemove: (id: string) => void;
}) {
  const { patch, delete: destroy, processing, data, setData } = useForm<{ quantity: number }>({
    quantity: item.quantity,
  });

  // Incrementar / decrementar con límites
  const setQty = (q: number) => {
    const safe = Math.max(1, q);
    setData('quantity', safe);
    onLocalChange({ ...item, quantity: safe });
  };

  const update = () =>
    patch(path.cartItem(item.id), {
      preserveScroll: true,
      onSuccess: () => {
        // El componente padre recalcula y emite 'cart:set'.
      },
      onError: () => {
        // Si falla, revierte el cambio local al valor original del servidor
        onLocalChange({ ...item, quantity: item.quantity });
      },
    });

  const remove = () =>
    destroy(path.cartItem(item.id), {
      preserveScroll: true,
      onSuccess: () => {
        onLocalRemove(item.id);
      },
    });

  return (
    <div className="flex items-start gap-4 rounded-2xl border p-4">
      <Link href={path.product(item.product.id)} className="shrink-0">
        <img
          src={`https://picsum.photos/seed/${item.product.id}/160/120`}
          alt={item.product.name}
          className="h-24 w-32 rounded-xl object-cover"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={path.product(item.product.id)} className="line-clamp-1 font-medium">
          {item.product.name}
        </Link>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {currency(item.product.price)} • Stock: {item.product.stock}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <QtyStepper value={data.quantity} onChange={setQty} disabled={processing} />

          <button
            onClick={update}
            disabled={processing}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
          >
            Actualizar
          </button>

          <button
            onClick={remove}
            disabled={processing}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
          >
            Quitar
          </button>
        </div>
      </div>

      <div className="ml-auto text-right">
        <p className="font-semibold">{currency(Number(item.product.price) * data.quantity)}</p>
      </div>
    </div>
  );
}

function QtyStepper({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (next: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= 1}
        className="grid h-10 w-10 place-items-center text-lg hover:bg-muted disabled:opacity-40"
        aria-label="Disminuir cantidad"
      >
        –
      </button>
      <input
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-10 w-16 border-x px-2 text-center outline-none"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        className="grid h-10 w-10 place-items-center text-lg hover:bg-muted disabled:opacity-40"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
