import StatusBadge from '@/components/StatusBadge';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem} from '@/types';
import type { Product } from '@/types/types';
import { Head, Link } from '@inertiajs/react';


type Props = { product: Product };

export default function Show({ product }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Productos', href: route('admin.products.index') },
    { title: product.name, href: '#' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={product.name} />
      <div className="rounded border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <StatusBadge active={!!product.is_active} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Precio</p>
            <p className="font-medium">S/ {Number(product.price).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Stock</p>
            <p className="font-medium">{product.stock}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Estado</p>
            <p className="font-medium">{product.is_active ? 'Activo' : 'Inactivo'}</p>
          </div>
        </div>

        {product.description && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Descripción</p>
            <p>{product.description}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Link
            href={route('admin.products.edit', product.id)}
            className="rounded border px-3 py-2 hover:bg-gray-50"
          >
            Editar
          </Link>
          <Link
            href={route('admin.products.index')}
            className="rounded border px-3 py-2 hover:bg-gray-50"
          >
            Volver
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
