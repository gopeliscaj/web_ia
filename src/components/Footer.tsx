import { ArrowUp, Mail, MapPin, Phone, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Historia', href: '#historia' },
  { label: 'Artesanos', href: '#artesanos' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-tinta-950 text-crema-100">
      {/* Newsletter CTA */}
      <div className="container-aurora">
        <div className="reveal -mt-px rounded-5xl border border-tinta-800 bg-gradient-warm px-6 py-12 md:-mt-16 md:px-16 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-display text-fluid-h3 font-light leading-tight text-crema-50">
                Lleva el oficio andino a tu hogar.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-crema-50/80">
                Recibe novedades, piezas nuevas y descuentos especiales直接 en tu correo.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="tu@correo.com"
                aria-label="Correo para newsletter"
                className="flex-1 rounded-full border border-crema-50/25 bg-crema-50/10 px-5 py-3.5 text-sm text-crema-50 placeholder:text-crema-50/50 backdrop-blur-sm transition focus:border-crema-50/50 focus:bg-crema-50/15 focus:outline-none"
              />
              <button type="submit" className="btn-dark border border-crema-50/20 bg-crema-50 text-tinta-900 hover:bg-crema-50/90">
                Suscribirme
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-aurora py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-warm text-crema-50">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 19 Q12 6 19 19" />
                  <circle cx="12" cy="13" r="1.8" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-base font-semibold tracking-tightish text-crema-50">
                  Cajamarca
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.25em] text-ocre-300">
                  Artesanías
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-crema-100/70">
              Tienda digital de productos artesanales de Cajamarca, Perú. Conectamos a
              artesanos con personas que valoran lo hecho a mano.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-tinta-800 text-crema-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-ocre-300 hover:text-ocre-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-tinta-800 text-crema-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-ocre-300 hover:text-ocre-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs uppercase tracking-[0.25em] text-ocre-300">Navegación</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group inline-flex items-center gap-2 text-sm text-crema-100/80 transition-colors hover:text-ocre-300"
                  >
                    <span className="h-px w-0 bg-ocre-300 transition-all duration-300 group-hover:w-4" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.25em] text-ocre-300">Contacto</h3>
            <ul className="mt-5 space-y-4 text-sm text-crema-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ocre-300" />
                <span>Cajamarca, Perú</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ocre-300" />
                <a href="mailto:hola@artesania-cajamarca.pe" className="transition-colors hover:text-ocre-300">
                  hola@artesania-cajamarca.pe
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ocre-300" />
                <span>+51 999 888 777</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-tinta-800 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-crema-100/50">
            © {new Date().getFullYear()} Artesanías de Cajamarca. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-crema-100/50 transition-colors hover:text-ocre-300">
              Aviso de privacidad
            </a>
            <a href="#" className="text-xs text-crema-100/50 transition-colors hover:text-ocre-300">
              Términos de venta
            </a>
            <a
              href="#inicio"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-tinta-800 text-crema-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-ocre-300 hover:text-ocre-300"
              aria-label="Volver arriba"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
