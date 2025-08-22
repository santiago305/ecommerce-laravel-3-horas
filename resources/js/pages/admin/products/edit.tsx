import ProductForm from '@/components/forms/ProductForm';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem} from '@/types';
import type { Product } from '@/types/types';
import { Head } from '@inertiajs/react';


type Props = { product: Product };

export default function Edit({ product }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Productos', href: route('admin.products.index') },
    { title: product.name, href: route('admin.products.show', product.id) },
    { title: 'Editar', href: '#' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Editar: ${product.name}`} />
      <div className="rounded border p-4 ">
        <ProductForm
          initial={product}
          submitRoute={route('admin.products.update', product.id)}
          method="put"
        />
      </div>
    </AppLayout>
  );
}
