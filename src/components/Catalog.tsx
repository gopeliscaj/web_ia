import { useEffect, useState } from 'react';
import { ShoppingBag, Loader2, Plus, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import type { Category, ProductWithCategory } from '@/types';
import { formatPrice } from '@/types';

export default function Catalog() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<string>('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<string | null>(null);
  const { add } = useCart();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [{ data: cats, error: catErr }, { data: prods, error: prodErr }] =
          await Promise.all([
            supabase.from('categories').select('*').order('name'),
            supabase.from('products').select('*, categories(*)').order('created_at'),
          ]);
        if (!mounted) return;
        if (catErr || prodErr) throw catErr || prodErr;
        setCategories(cats ?? []);
        setProducts(prods ?? []);
      } catch (e) {
        setError('No se pudo cargar el catálogo. Inténtalo de nuevo.');
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAdd = (p: ProductWithCategory) => {
    add(p);
    setAdded(p.id);
    setTimeout(() => setAdded((cur) => (cur === p.id ? null : cur)), 1400);
  };

  const filtered =
    active === 'todos'
      ? products
      : products.filter((p) => p.categories?.slug === active);

  const countFor = (slug: string) =>
    slug === 'todos' ? products.length : products.filter((p) => p.categories?.slug === slug).length;

  return (
    <section id="productos" className="bg-crema-50 py-24 md:py-32">
      <div className="container-aurora">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Catálogo
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-fluid-h2 font-light leading-[1.02]">
              Piezas únicas,
              <br />
              <span className="italic text-gradient-warm">hechas a mano</span>.
            </h2>
          </div>
          <p className="max-w-sm text-tinta-700">
            Selecciona una categoría para explorar. Cada producto es elaborado por
            artesanos cajamarquinos y disponible mientras dure el stock.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal mt-10 flex items-center gap-2 overflow-x-auto pb-2">
          <FilterChip
            label="Todos"
            count={countFor('todos')}
            active={active === 'todos'}
            onClick={() => setActive('todos')}
          />
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              label={c.name}
              count={countFor(c.slug)}
              active={active === c.slug}
              onClick={() => setActive(c.slug)}
            />
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="mt-10 rounded-4xl border border-red-200 bg-red-50 px-6 py-16 text-center">
            <p className="text-red-700">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-4xl border border-crema-200 bg-crema-100 px-6 py-16 text-center">
            <p className="text-tinta-800">No hay productos en esta categoría todavía.</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} added={added === p.id} onAdd={() => handleAdd(p)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  added,
  onAdd,
}: {
  product: ProductWithCategory;
  index: number;
  added: boolean;
  onAdd: () => void;
}) {
  const soldOut = product.stock === 0;
  return (
    <article
      className={`reveal reveal-delay-${(index % 4) + 1} group card-surface card-hover flex flex-col overflow-hidden`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.alt}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-spring group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tinta-900/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.featured && (
            <span className="rounded-full bg-ocre-400 px-3 py-1 text-xs font-semibold text-tinta-950 shadow-soft">
              Destacado
            </span>
          )}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-barro-700/95 px-3 py-1 text-xs font-semibold text-crema-50 shadow-soft backdrop-blur-sm">
            Quedan {product.stock}
          </span>
        )}
        {soldOut && (
          <span className="absolute right-3 top-3 rounded-full bg-tinta-900/90 px-3 py-1 text-xs font-semibold text-crema-50 shadow-soft backdrop-blur-sm">
            Agotado
          </span>
        )}

        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-400 ease-spring group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={onAdd}
            disabled={soldOut}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold shadow-soft backdrop-blur-sm transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
              added
                ? 'bg-andino-500 text-crema-50'
                : 'bg-crema-50/95 text-barro-700 hover:bg-white'
            }`}
            aria-label={`Añadir ${product.name} al carrito`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.5} />
                Añadido
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Añadir al carrito
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-barro-500">
          {product.categories?.name ?? 'Artesanía'}
        </span>
        <h3 className="mt-2 font-display text-xl font-medium leading-tight text-tinta-900">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta-700 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-crema-100 pt-4">
          <span className="font-display text-lg font-semibold text-barro-700">
            {formatPrice(Number(product.price))}
          </span>
          <button
            type="button"
            onClick={onAdd}
            disabled={soldOut}
            className="flex items-center gap-1.5 rounded-full bg-barro-700 px-4 py-2 text-sm font-semibold text-crema-50 transition-all duration-300 hover:bg-barro-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:hidden"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingBag className="h-4 w-4" />
            {soldOut ? 'Agotado' : 'Añadir'}
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-spring ${
        active
          ? 'border-barro-700 bg-barro-700 text-crema-50 shadow-warm'
          : 'border-crema-300 bg-crema-50 text-tinta-800 hover:border-barro-400 hover:bg-crema-100'
      }`}
    >
      {label}
      <span className={`text-xs ${active ? 'text-crema-50/70' : 'text-barro-400'}`}>{count}</span>
    </button>
  );
}

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-4xl border border-crema-200 bg-white">
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="skeleton h-5 w-32 rounded-lg" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-10 w-full rounded-full" />
      </div>
    </div>
  );
}
