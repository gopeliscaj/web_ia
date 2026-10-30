export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  category_id: string | null;
  stock: number;
  featured: boolean;
};

export type ProductWithCategory = Product & {
  categories: Category | null;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  qty: number;
};

export type OrderPayload = {
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  city: string;
  notes: string | null;
  items: CartItem[];
  total: number;
};

export const CURRENCY = 'PEN';

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 2,
  }).format(value);
}
