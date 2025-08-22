import Pagination from '@/components/Pagination';
import ProductTable from '@/components/ProductTable';
import SearchInput from '@/components/SearchInput';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps } from '@/types';
import { Product } from '@/types/types';

import { Head, Link, usePage } from '@inertiajs/react';


type Props = PageProps & {
  products: {
    data: Product[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: { q: string };
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/admin/dashboard' },
  { title: 'Productos', href: route('admin.products.index') },
];

export default function Index({ products, filters }: Props) {
  const { props } = usePage<PageProps & { flash?: { status?: string } }>();
  const status = props.flash?.status;

  const message = (() => {
    switch (status) {
      case 'product-deleted':
        return { text: 'Producto eliminado.', tone: 'success' };
      case 'product-has-orders':
        return { text: 'No se puede eliminar: el producto tiene órdenes asociadas.', tone: 'error' };
      case 'product-in-carts':
        return { text: 'No se puede eliminar: el producto está en carritos.', tone: 'warning' };
      case 'product-created':
        return { text: 'Producto creado correctamente.', tone: 'success' };
      case 'product-updated':
        return { text: 'Producto actualizado.', tone: 'success' };
      default:
        return null;
    }
  })();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Productos" />

      <div className="flex items-center justify-between mb-4">
        <div className="max-w-sm w-full">
          <SearchInput initial={filters.q} routeName="admin.products.index" />
        </div>
        <Link
          href={route('admin.products.create')}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nuevo producto
        </Link>
      </div>

      {message && (
        <div
          className={`mb-4 rounded border px-3 py-2 text-sm ${
            message.tone === 'success'
              ? 'border-green-300 bg-green-50 text-green-800'
              : message.tone === 'warning'
              ? 'border-yellow-300 bg-yellow-50 text-yellow-800'
              : 'border-red-300 bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <ProductTable products={products} />
      <Pagination links={products.links} />
    </AppLayout>
  );
}
