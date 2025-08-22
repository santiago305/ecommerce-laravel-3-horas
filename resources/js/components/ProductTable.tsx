import { Link, router } from '@inertiajs/react';

import type { Product } from '@/types/types';
import StatusBadge from './StatusBadge';

type Props = {
  products: {
    data: Product[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  canDelete?: boolean; // por si quieres condicionar
};

export default function ProductTable({ products, canDelete = true }: Props) {
  const onDelete = (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;
    router.delete(route('admin.products.destroy', id), { preserveScroll: true });
  };

  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left">Nombre</th>
            <th className="px-3 py-2 text-left">Precio</th>
            <th className="px-3 py-2 text-left">Stock</th>
            <th className="px-3 py-2 text-left">Estado</th>
            <th className="px-3 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.data.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-3 py-2">{p.name}</td>
              <td className="px-3 py-2">S/ {Number(p.price).toFixed(2)}</td>
              <td className="px-3 py-2">{p.stock}</td>
              <td className="px-3 py-2">
                <StatusBadge active={!!p.is_active} />
              </td>
              <td className="px-3 py-2 text-right">
                <div className="inline-flex gap-2">
                  <Link
                    href={route('admin.products.show', p.id)}
                    className="rounded border px-2 py-1 hover:bg-gray-50"
                  >
                    Ver
                  </Link>
                  <Link
                    href={route('admin.products.edit', p.id)}
                    className="rounded border px-2 py-1 hover:bg-gray-50"
                  >
                    Editar
                  </Link>
                  {canDelete && (
                    <button
                      onClick={() => onDelete(p.id)}
                      className="rounded border px-2 py-1 text-red-600 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {products.data.length === 0 && (
            <tr>
              <td className="px-3 py-8 text-center text-gray-500" colSpan={5}>
                No hay productos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
