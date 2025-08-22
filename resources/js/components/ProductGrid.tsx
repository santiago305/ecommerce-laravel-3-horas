import { Paginated, Product } from '@/types/types';
import ProductCard from './ProductCard';


export default function ProductGrid({ products }: { products: Paginated<Product> }) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.data.map((p) => (
        <ProductCard key={p.id} p={p} />
        ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2">
        {products.links.map((l, i) => (
        <a key={i} href={l.url ?? '#'} dangerouslySetInnerHTML={{ __html: l.label }} className={`rounded-lg border px-3 py-1.5 text-sm ${l.active ? 'bg-foreground text-background' : 'hover:bg-muted'}`} />
        ))}
        </div>
        </section>
    );
}
