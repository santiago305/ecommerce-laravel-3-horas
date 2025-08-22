import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/admin/dashboard' },
  { title: 'Productos', href: route('admin.products.index') },
  { title: 'Nuevo', href: '#' },
];

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    price: '',
    stock: 0,
    is_active: true,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.products.store'), {
      preserveScroll: true,
      onSuccess: () => reset('description'), // limpia solo lo que tiene sentido
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Nuevo producto" />

      <div className="rounded border">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h1 className="text-lg font-semibold">Crear producto</h1>
          <Link
            href={route('admin.products.index')}
            className="rounded border px-3 py-1.5 text-sm "
          >
            Volver
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-4 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm mb-1 font-medium">Nombre</label>
            <input
              type="text"
              className="w-full rounded border px-3 py-2"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
              maxLength={100}
              autoFocus
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm mb-1 font-medium">Descripción</label>
            <textarea
              className="w-full rounded border px-3 py-2"
              rows={4}
              value={data.description ?? ''}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Opcional"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Precio / Stock / Estado */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm mb-1 font-medium">Precio (S/.)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full rounded border px-3 py-2"
                value={data.price}
                onChange={(e) => setData('price', e.target.value)}
                required
                inputMode="decimal"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">Stock</label>
              <input
                type="number"
                min="0"
                className="w-full rounded border px-3 py-2"
                value={data.stock}
                onChange={(e) => setData('stock', Number(e.target.value))}
                required
                inputMode="numeric"
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
            </div>

            <div className="flex items-center gap-2 md:pt-6">
              <input
                id="is_active"
                type="checkbox"
                checked={!!data.is_active}
                onChange={(e) => setData('is_active', e.target.checked)}
              />
              <label htmlFor="is_active" className="text-sm">Activo</label>
            </div>
          </div>
          {errors.is_active && (
            <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              disabled={processing}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Guardando…' : 'Crear producto'}
            </button>
            <Link
              href={route('admin.products.index')}
              className="rounded border px-4 py-2 hover:bg-gray-50"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
