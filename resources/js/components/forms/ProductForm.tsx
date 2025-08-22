import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import type { Product } from '@/types/types';

type Props = {
  initial?: Partial<Product>;
  submitRoute: string;
  method?: 'post' | 'put';
  onSuccess?: () => void;
};

export default function ProductForm({ initial = {}, submitRoute, method = 'post', onSuccess }: Props) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: initial.name ?? '',
    description: initial.description ?? '',
    price: initial.price ?? '',
    stock: initial.stock ?? 0,
    is_active: initial.is_active ?? true,
  });

  useEffect(() => {
    return () => reset(); // limpia al desmontar
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = method === 'put' ? put : post;
    action(submitRoute, {
      preserveScroll: true,
      onSuccess,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Nombre</label>
        <input
          type="text"
          className="w-full rounded border px-3 py-2"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          required
          maxLength={100}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Descripción</label>
        <textarea
          className="w-full rounded border px-3 py-2"
          value={data.description ?? ''}
          onChange={(e) => setData('description', e.target.value)}
          rows={4}
        />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Precio (S/.)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded border px-3 py-2"
            value={data.price}
            onChange={(e) => setData('price', e.target.value)}
            required
          />
          {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Stock</label>
          <input
            type="number"
            min="0"
            className="w-full rounded border px-3 py-2"
            value={data.stock}
            onChange={(e) => setData('stock', Number(e.target.value))}
            required
          />
          {errors.stock && <p className="text-sm text-red-600 mt-1">{errors.stock}</p>}
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            id="is_active"
            type="checkbox"
            checked={!!data.is_active}
            onChange={(e) => setData('is_active', e.target.checked)}
          />
          <label htmlFor="is_active">Activo</label>
        </div>
      </div>

      {errors.is_active && <p className="text-sm text-red-600 mt-1">{errors.is_active}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={processing}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {method === 'put' ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
  );
}
