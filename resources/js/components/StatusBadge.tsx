type Props = { active: boolean };

export default function StatusBadge({ active }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {active ? 'Activo' : 'Inactivo'}
    </span>
  );
}
