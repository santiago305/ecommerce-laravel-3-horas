import React, { useMemo } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Link } from '@inertiajs/react';
import { Product } from '@/types/types';
import ProductCard from '@/components/ProductCard';
import { path } from '@/lib/routes';

// —————————————————————————————————————————————
// Welcome: Rediseño con estética de joyería
// —————————————————————————————————————————————
// Principios de diseño usados:
// • Look editorial: grandes márgenes, tipografía elegante, mucho aire.
// • Enfoque de marca joyera: héroe aspiracional, badges de confianza,
//   categorías clave (Anillos, Cadenas, Dijes, Pulseras), y spotlight
//   de la colección "Arcángel San Miguel" (si aplica).
// • Reutiliza Header/Footer/ProductCard existentes.
// • Tailwind: sombras suaves, bordes 2xl, grid editorial.
// —————————————————————————————————————————————

export default function Welcome({ products = [] }: { products: Product[] }) {
  const sorted = useMemo(
    () =>
      [...products].sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
      ),
    [products]
  );

  const featured = sorted.slice(0, 10);
  const [p0, p1, p2] = sorted;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />

      <main>
        {/* HERO editorial */}
        <section className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6 md:pt-16">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-xs tracking-[0.22em] text-muted-foreground">COLECCIONES 2025</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                  Joyería fina que
                  <span className="block font-light italic">celebra tu historia</span>
                </h1>
                <p className="mt-5 max-w-md text-sm text-muted-foreground md:max-w-lg md:text-base">
                  Piezas en plata 950 y oro 18K, trabajadas con detalle artesanal. Descubre
                  dijes, cadenas, pulseras y anillos que elevan cualquier look.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={path.products} className="rounded-2xl border px-4 py-2 text-sm hover:bg-muted">
                    Ver todo
                  </Link>
                  {/* <Link href={`${path.products}?q=Arcángel`} className="rounded-2xl border px-4 py-2 text-sm hover:bg-muted">
                    Colección Arcángel
                  </Link> */}
                </div>
                {/* Chips de categorías clave */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {['Anillos','Cadenas','Dijes','Pulseras'].map((c) => (
                    <div
                      key={c}
                      // href={`${path.products}?q=${encodeURIComponent(c)}`}
                      className="rounded-full border px-3 py-1.5 text-xs hover:bg-muted"
                    >
                      {c}
                    </div>
                  ))}
                </div>
                {/* Badges de confianza */}
                <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-muted-foreground md:grid-cols-4">
                  {[
                    'Plata 950 certificada',
                    'Oro 18K garantizado',
                    'Hecho a mano',
                    'Envíos a todo el Perú',
                  ].map((b) => (
                    <div key={b} className="rounded-xl border p-3">{b}</div>
                  ))}
                </div>
              </div>

              {/* Visual hero: mosaico editorial */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <figure className="col-span-2 overflow-hidden rounded-3xl border">
                  <img
                    src={`https://picsum.photos/seed/${p0?.id ?? 'joyaA'}/900/600`}
                    alt={p0?.name ?? 'Nueva pieza joyería'}
                    className="h-[260px] w-full object-cover md:h-[360px]"
                  />
                </figure>
                <figure className="overflow-hidden rounded-3xl border">
                  <img
                    src={`https://picsum.photos/seed/${p1?.id ?? 'joyaB'}/500/600`}
                    alt={p1?.name ?? 'Detalle joya'}
                    className="h-[260px] w-full object-cover md:h-[360px]"
                  />
                </figure>
                <figure className="col-span-3 overflow-hidden rounded-3xl border">
                  <img
                    src={`https://picsum.photos/seed/${p2?.id ?? 'joyaC'}/1200/520`}
                    alt={p2?.name ?? 'Colección editorial'}
                    className="h-[220px] w-full object-cover md:h-[280px]"
                  />
                </figure>
              </div>
            </div>
          </div>

          {/* Degradado sutil al borde inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />
        </section>

        {/* SPOTLIGHT: Arcángel San Miguel (si está en catálogo) */}
        <section className="mx-auto mt-6 max-w-7xl px-4 md:px-6">
          <div className="overflow-hidden rounded-3xl border">
            <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-10">
              <div>
                <p className="text-xs tracking-[0.22em] text-muted-foreground">EDICIÓN ESPECIAL</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  Arcángel San Miguel — dijes y cadenas
                </h2>
                <p className="mt-3 max-w-prose text-sm text-muted-foreground">
                  Devoción y estilo en piezas refinadas. Lleva un símbolo de protección con acabados
                  pulidos y relieve definido.
                </p>
                <div className="mt-5 flex gap-3">
                  <Link href={`${path.products}`} className="rounded-2xl border px-4 py-2 text-sm hover:bg-muted">
                    Ver colección
                  </Link>
                  {p0 && (
                    <Link href={path.product(p0.id)} className="rounded-2xl border px-4 py-2 text-sm hover:bg-muted">
                      Ver pieza destacada
                    </Link>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/5 to-transparent" />
                <img
                  src={`https://picsum.photos/seed/${p0?.id ?? 'arcangel'}/1100/700`}
                  alt={p0?.name ?? 'Colección Arcángel San Miguel'}
                  className="h-[280px] w-full rounded-2xl object-cover md:h-[360px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* LISTADO: Productos destacados */}
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Piezas destacadas</h3>
              <p className="text-sm text-muted-foreground">Selección curada de lo más nuevo</p>
            </div>
            <Link href={path.products} className="text-sm underline-offset-4 hover:underline">
              Ver todo
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
            {featured.length === 0 && (
              <p className="col-span-full text-muted-foreground">No hay productos para mostrar.</p>
            )}
          </div>
        </section>

        {/* LOOKBOOK mini (editorial grid) */}
        <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
          <div className="overflow-hidden rounded-3xl border">
            <div className="grid gap-2 p-2 md:grid-cols-4 md:gap-3 md:p-3">
              {[0,1,2,3,4,5,6,7].map((i) => (
                <div key={i} className={`overflow-hidden rounded-2xl ${i===0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <img
                    src={`https://picsum.photos/seed/look${i}/800/800`}
                    alt={`Editorial ${i+1}`}
                    className="h-40 w-full object-cover md:h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA WhatsApp / Atención personalizada */}
        <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
          <div className="rounded-3xl border p-6 md:p-10">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-2xl font-semibold tracking-tight">Asesoría personalizada</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  ¿Buscas una medida o grabado especial? Nuestro equipo te ayuda a elegir la pieza perfecta.
                </p>
              </div>
              <div className="flex justify-start md:justify-end">
                <a
                  href="https://wa.me/51999999999"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-muted"
                >
                  Escríbenos por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
