import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductGrid from '@/components/ProductGrid';
import { Paginated, Product } from '@/types/types';


export default function Index({ products, filters }: { products: Paginated<Product>; filters: { q?: string } }) {
return (
<div className="min-h-dvh bg-background text-foreground">
<Header defaultQ={filters?.q ?? ''} />
<main>
<div className="mx-auto max-w-7xl px-4 md:px-6">
<h1 className="sr-only">Productos</h1>
</div>
<ProductGrid products={products} />
</main>
<Footer />
</div>
);
}
