import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Props = {
  initial?: string;
  routeName: string; // 'admin.products.index'
};

export default function SearchInput({ initial = '', routeName }: Props) {
  const [q, setQ] = useState(initial);

  useEffect(() => {
    const t = setTimeout(() => {
      router.get(route(routeName), { q }, { preserveState: true, replace: true });
    }, 350);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <input
      type="text"
      placeholder="Buscar producto..."
      className="w-full rounded border px-3 py-2"
      value={q}
      onChange={(e) => setQ(e.target.value)}
    />
  );
}
