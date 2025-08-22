export type UUID = string;

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Paginated<T> {
  data: T[];
  links: PaginationLink[]; // Laravel paginator-compatible
}

export interface Product {
  id: UUID;
  name: string;
  description: string;
  price: string | number; // decimal:2 puede venir como string desde PHP
  stock: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItemDTO {
  id: UUID;
  cart_id: UUID;
  product_id: UUID;
  quantity: number;
  product: Product;
}

export interface OrderItemDTO {
  id: UUID;
  order_id: UUID;
  product_id: UUID;
  quantity: number;
  unit_price: string | number;
  tax_rate: string | number; // porcentaje, ej. 18
  total_line: string | number;
  product?: Product;
}

export interface OrderDTO {
  id: UUID;
  user_id: UUID;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  subtotal: string | number;
  tax: string | number;
  total: string | number;
  payment_method: string;
  payment_ref: string | null;
  created_at?: string;
  updated_at?: string;
  items?: OrderItemDTO[];
}

// ---------- Utils ----------

/** Convierte string | number a número JS de forma segura */
const toNumber = (v: string | number): number =>
  typeof v === 'string' ? Number.parseFloat(v) : v;

/** Formatea moneda (default: PEN para Perú) */
export const currency = (
  v: string | number,
  locale: string = 'es-PE',
  ccy: string = 'PEN'
): string => {
  const n = toNumber(v);
  const safe = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(safe);
};
