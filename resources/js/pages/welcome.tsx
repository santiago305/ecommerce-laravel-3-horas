import React, { useMemo } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Link } from '@inertiajs/react';
import { Product } from '@/types/types';
import ProductCard from '@/components/ProductCard';
import { path } from '@/lib/routes';

export default function Welcome({ products = [] }: { products: Product[] }) {
  // Ordenamos por fecha de creación DESC para asegurar "los últimos" productos
  const sorted = useMemo(() =>
    [...products].sort((a, b) =>
      new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
    ), [products]
  );

  // 10 productos en la pantalla principal
  const featured = sorted.slice(0, 10);

  // Los 2 más recientes para las imágenes de portada
  const lastTwo = sorted.slice(0, 2);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />
      <main>
        {/* Hero con los últimos 2 productos */}
        <section className="relative mx-auto mt-6 max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {lastTwo[0] && (
              <article className="relative col-span-2 overflow-hidden rounded-3xl border">
                <img
                  src={`https://picsum.photos/seed/${lastTwo[0].id}/1200/600`
                  }
                  alt={lastTwo[0].name}
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
                  <p className="mb-1 text-sm/none opacity-90">Nuevo</p>
                  <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                    {lastTwo[0].name}
                  </h2>
                  <Link
                    href={path.product(lastTwo[0].id)}
                    className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
                  >
                    Ver producto
                  </Link>
                </div>
              </article>
            )}
            {lastTwo[1] && (
              <article className="relative overflow-hidden rounded-3xl border">
                <img
                  src={`https://picsum.photos/seed/${lastTwo[1].id}/600/400`}
                  alt={lastTwo[1].name}
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {lastTwo[1].name}
                  </h3>
                  <Link
                    href={path.product(lastTwo[1].id)}
                    className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
                  >
                    Ver producto
                  </Link>
                </div>
              </article>
            )}
          </div>
        </section>

        {/* Lista de 10 productos */}
        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <h2 className="mb-6 text-xl font-semibold">Productos destacados</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
            {featured.length === 0 && (
              <p className="col-span-full text-muted-foreground">No hay productos para mostrar.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
