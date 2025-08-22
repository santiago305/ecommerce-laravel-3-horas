import { Link } from '@inertiajs/react';

type LinkItem = { url: string | null; label: string; active: boolean };
type Props = { links: LinkItem[] };

export default function Pagination({ links }: Props) {
  if (!links?.length) return null;
  return (
    <nav className="flex flex-wrap gap-2 mt-4">
      {links.map((l, i) => {
        const label = l.label.replace('&laquo;', '«').replace('&raquo;', '»');
        return l.url ? (
          <Link
            key={i}
            href={l.url}
            preserveScroll
            className={`rounded border px-3 py-1 text-sm ${
              l.active ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'
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
  );
}
