import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Product, currency } from '@/types/types';
import { useForm } from '@inertiajs/react';
import { path } from '@/lib/routes';


export default function Show({ product }: { product: Product }) {
const { post, processing, data, setData } = useForm({ product_id: product.id, quantity: 1 });
const onAdd = () => post(path.cartStore);


return (
<div className="min-h-dvh bg-background text-foreground">
    <Header />
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-2 md:px-6">
    <img src={`https://picsum.photos/seed/${product.id}/900/900`} alt={product.name} className="aspect-square w-full rounded-2xl border object-cover" />
    <div>
    <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
    <p className="mt-3 text-2xl">{currency(product.price)}</p>
    <p className="mt-4 text-sm text-muted-foreground whitespace-pre-line">{product.description}</p>
    <div className="mt-6 flex items-center gap-3">
    <input type="number" min={1} value={data.quantity} onChange={(e) => setData('quantity', Number(e.target.value))} className="h-11 w-24 rounded-xl border px-3" />
    <button onClick={onAdd} disabled={processing || !product.is_active || product.stock <= 0} className="h-11 rounded-xl bg-foreground px-5 text-sm font-medium text-background disabled:opacity-50">Añadir al carrito</button>
    </div>
    </div>
    </main>
    <Footer />
</div>
);
}
