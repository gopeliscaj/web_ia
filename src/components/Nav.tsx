import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Historia', href: '#historia' },
  { label: 'Artesanos', href: '#artesanos' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress bar */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-crema-200/60">
        <div
          className="h-full bg-gradient-to-r from-barro-500 via-ocre-400 to-barro-600 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className={`transition-all duration-500 ease-spring ${
          scrolled
            ? 'border-b border-crema-200 bg-crema-50/85 backdrop-blur-xl shadow-soft'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-aurora flex h-16 items-center justify-between md:h-20">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Artesanías de Cajamarca">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-warm text-crema-50 shadow-warm transition-transform duration-500 ease-spring group-hover:rotate-[-6deg]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 19 Q12 6 19 19" />
                <circle cx="12" cy="13" r="1.8" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold tracking-tightish text-tinta-900">
                Cajamarca
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-barro-500">
                Artesanías
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-tinta-800 transition-colors hover:text-barro-700"
                >
                  {item.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-barro-600 transition-transform duration-300 ease-spring group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={openCart}
              className="group relative flex h-11 items-center gap-2 rounded-full border border-crema-200 bg-crema-50/60 px-4 text-tinta-900 transition-all duration-300 hover:border-barro-400 hover:bg-white hover:shadow-soft"
              aria-label={`Abrir carrito, ${count} artículos`}
            >
              <ShoppingBag className="h-[1.05rem] w-[1.05rem] text-barro-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden text-sm font-medium sm:inline">Carrito</span>
              {count > 0 && (
                <span className="flex h-5 min-w-[1.25rem] animate-bounce-in items-center justify-center rounded-full bg-barro-700 px-1.5 text-xs font-bold text-crema-50">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-crema-200 bg-crema-50/60 text-tinta-900 transition-colors hover:bg-crema-100 md:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              <span className="relative h-5 w-5">
                <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 top-16 z-40 bg-tinta-900/40 backdrop-blur-sm transition-opacity duration-400 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <ul
          className={`fixed inset-x-0 top-16 z-50 flex flex-col gap-1 border-b border-crema-200 bg-crema-50 px-5 pb-8 pt-4 shadow-soft-lg transition-all duration-500 ease-spring ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          }`}
        >
          {navItems.map((item, i) => (
            <li
              key={item.href}
              style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
              className={open ? 'animate-slide-in-right' : ''}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl tracking-tightish text-tinta-900 transition-colors hover:bg-crema-100 hover:text-barro-700"
              >
                {item.label}
                <span className="text-xs text-barro-400">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
