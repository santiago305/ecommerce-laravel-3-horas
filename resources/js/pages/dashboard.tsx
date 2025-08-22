import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* ====== LISTADO DE PRODUCTOS (usa props de Inertia) ====== */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                {(() => {
                    // Acceso seguro a props sin nuevos imports
                    const page: any =
                        (window as any).Inertia?.page ??
                        (window as any).__inertia?.page ??
                        {};
                    const props = page.props ?? {};
                    const products = props.products ?? { data: [], links: [] };
                    const filters = props.filters ?? { q: '' };
                    const flash = props.flash ?? {};

                    // CSRF para formularios DELETE clásicos
                    const csrf =
                        (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
                            ?.content ?? '';

                    return (
                        <>
                            {/* Fila superior: buscador + botón Nuevo */}
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <form
                                    method="get"
                                    action="/admin/products"
                                    className="flex w-full max-w-sm items-center gap-2"
                                >
                                    <input
                                        type="text"
                                        name="q"
                                        defaultValue={filters.q}
                                        placeholder="Buscar producto…"
                                        className="w-full rounded border px-3 py-2"
                                    />
                                    <button
                                        type="submit"
                                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        Buscar
                                    </button>
                                </form>

                                <a
                                    href="/admin/products/create"
                                    className="inline-flex items-center justify-center rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                >
                                    Nuevo producto
                                </a>
                            </div>

                            {/* Flash messages */}
                            {flash.status && (
                                <div
                                    className={[
                                        'rounded border px-3 py-2 text-sm',
                                        flash.status === 'product-deleted'
                                            ? 'border-green-300 bg-green-50 text-green-800'
                                            : flash.status === 'product-created' ||
                                              flash.status === 'product-updated'
                                            ? 'border-green-300 bg-green-50 text-green-800'
                                            : flash.status === 'product-in-carts'
                                            ? 'border-yellow-300 bg-yellow-50 text-yellow-800'
                                            : 'border-red-300 bg-red-50 text-red-800',
                                    ].join(' ')}
                                >
                                    {flash.status === 'product-deleted' && 'Producto eliminado.'}
                                    {flash.status === 'product-created' && 'Producto creado correctamente.'}
                                    {flash.status === 'product-updated' && 'Producto actualizado.'}
                                    {flash.status === 'product-in-carts' &&
                                        'No se puede eliminar: el producto está en carritos.'}
                                    {flash.status === 'product-has-orders' &&
                                        'No se puede eliminar: el producto tiene órdenes asociadas.'}
                                </div>
                            )}

                            {/* Tabla de productos */}
                            <div className="overflow-x-auto rounded border">
                                <table className="min-w-full text-sm">
                                    <thead className="">
                                        <tr>
                                            <th className="px-3 py-2 text-left">Nombre</th>
                                            <th className="px-3 py-2 text-left">Precio</th>
                                            <th className="px-3 py-2 text-left">Stock</th>
                                            <th className="px-3 py-2 text-left">Estado</th>
                                            <th className="px-3 py-2 text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(products.data ?? []).map((p: any) => (
                                            <tr key={p.id} className="border-t">
                                                <td className="px-3 py-2">{p.name}</td>
                                                <td className="px-3 py-2">S/ {Number(p.price).toFixed(2)}</td>
                                                <td className="px-3 py-2">{p.stock}</td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                                            p.is_active
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-200 text-gray-700'
                                                        }`}
                                                    >
                                                        {p.is_active ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <div className="inline-flex gap-2">
                                                        <a
                                                            href={`/admin/products/${p.id}`}
                                                            className="rounded border px-2 py-1 hover:bg-gray-50"
                                                        >
                                                            Ver
                                                        </a>
                                                        <a
                                                            href={`/admin/products/${p.id}/edit`}
                                                            className="rounded border px-2 py-1 hover:bg-gray-50"
                                                        >
                                                            Editar
                                                        </a>

                                                        {/* Eliminar (bloqueado por backend si tiene órdenes/carritos) */}
                                                        <form
                                                            method="post"
                                                            action={`/admin/products/${p.id}`}
                                                            className="inline"
                                                            onSubmit={(e) => {
                                                                if (!confirm('¿Eliminar este producto?')) e.preventDefault();
                                                            }}
                                                        >
                                                            <input type="hidden" name="_token" value={csrf} />
                                                            <input type="hidden" name="_method" value="delete" />
                                                            <button
                                                                type="submit"
                                                                className="rounded border px-2 py-1 text-red-600 hover:bg-red-50"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {(products.data ?? []).length === 0 && (
                                            <tr>
                                                <td className="px-3 py-8 text-center text-gray-500" colSpan={5}>
                                                    No hay productos
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginación */}
                            {Array.isArray(products.links) && products.links.length > 0 && (
                                <nav className="flex flex-wrap gap-2 mt-4">
                                    {products.links.map((l: any, i: number) => {
                                        const label = String(l.label)
                                            .replace('&laquo;', '«')
                                            .replace('&raquo;', '»');
                                        return l.url ? (
                                            <a
                                                key={i}
                                                href={l.url}
                                                className={`rounded border px-3 py-1 text-sm ${
                                                    l.active
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: label }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="rounded border px-3 py-1 text-sm text-gray-400 cursor-default"
                                                dangerouslySetInnerHTML={{ __html: label }}
                                            />
                                        );
                                    })}
                                </nav>
                            )}
                        </>
                    );
                })()}

                {/* Puedes mantener un bloque visual inferior con el PlaceholderPattern si quieres un look consistente */}
                <div className="relative min-h-[30vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
