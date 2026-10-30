/*
# Create catalog tables for Cajamarca artisan e-commerce (single-tenant, no auth)

1. New Tables
- `categories`
  - `id` (uuid, primary key)
  - `name` (text, not null) — category display name
  - `slug` (text, unique, not null) — url-friendly identifier
  - `description` (text, optional) — short category blurb
  - `created_at` (timestamptz, default now())

- `products`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `slug` (text, unique, not null)
  - `description` (text, not null)
  - `price` (numeric(10,2), not null) — price in PEN (soles)
  - `image` (text, not null) — full image URL
  - `alt` (text, not null) — accessibility text for the image
  - `category_id` (uuid, FK to categories) — product's category
  - `stock` (int, default 0) — available units
  - `featured` (boolean, default false) — shown on homepage highlight
  - `created_at` (timestamptz, default now())

- `orders`
  - `id` (uuid, primary key)
  - `customer_name` (text, not null)
  - `customer_email` (text, not null)
  - `customer_phone` (text, optional)
  - `shipping_address` (text, not null)
  - `city` (text, not null)
  - `notes` (text, optional)
  - `items` (jsonb, not null) — snapshot of cart: [{productId,name,price,qty}]
  - `total` (numeric(10,2), not null) — order total in PEN
  - `status` (text, default 'pendiente') — pendiente|confirmado|enviado|entregado
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on all three tables.
- categories + products: public read (anon + authenticated), no public writes.
- orders: public INSERT (customers place orders without sign-in), no public read/update/delete — only staff (authenticated) can read and manage orders.
- GRANT only the verbs each role needs.

3. Notes
- Single-tenant storefront: no user accounts. Anyone can browse; the order form writes a row; the shop owner reads orders after signing in.
- `items` is a jsonb snapshot so historical orders remain accurate even if product prices change later.
- No UPDATE/DELETE granted to anon — visitors cannot alter catalog or orders.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL,
  image text NOT NULL,
  alt text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  stock int NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  shipping_address text NOT NULL,
  city text NOT NULL,
  notes text,
  items jsonb NOT NULL,
  total numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pendiente',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Catalog: public read, no public writes
GRANT SELECT ON categories TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;

-- Orders: public insert, staff read/manage
GRANT INSERT ON orders TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON orders TO authenticated;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories"
ON categories FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products"
ON products FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders"
ON orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "staff_read_orders" ON orders;
CREATE POLICY "staff_read_orders"
ON orders FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "staff_update_orders" ON orders;
CREATE POLICY "staff_update_orders"
ON orders FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "staff_delete_orders" ON orders;
CREATE POLICY "staff_delete_orders"
ON orders FOR DELETE
TO authenticated
USING (true);
