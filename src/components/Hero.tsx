import { ArrowUpRight, Star, Truck, ShieldCheck } from 'lucide-react';

const trustBadges = [
  { icon: Truck, label: 'Envío a todo Perú' },
  { icon: ShieldCheck, label: 'Pago seguro' },
  { icon: Star, label: 'Hecho a mano' },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-paper pt-24 md:pt-28">
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[8%] h-[32rem] w-[32rem] rounded-full bg-ocre-300/30 blur-[130px]" />
        <div className="absolute bottom-1/4 left-[-5%] h-[24rem] w-[24rem] rounded-full bg-andino-400/20 blur-[120px]" />
        <div className="absolute right-1/3 top-0 h-px w-40 bg-gradient-to-r from-transparent via-barro-400/40 to-transparent" />
      </div>

      <div className="container-aurora">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 lg:pt-6">
          {/* Text column */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="reveal flex items-center gap-3">
              <span className="eyebrow-line" />
              <span className="eyebrow">Hecho a mano en Cajamarca, Perú</span>
            </div>

            <h1 className="reveal mt-7 font-display text-fluid-hero font-light leading-[0.92] tracking-tightest">
              Artesanía
              <br />
              que <span className="italic text-gradient-warm">cuenta</span>
              <br />
              una historia.
            </h1>

            <p className="reveal reveal-delay-1 mt-8 max-w-lg text-lg leading-relaxed text-tinta-800">
              Productos artesanales únicos de Cajamarca: cerámica, textilería, joyería y
              tallados en madera. Cada pieza nace del talento de artesanos que conservan
              técnicas heredadas por generaciones.
            </p>

            <div className="reveal reveal-delay-2 mt-10 flex flex-wrap items-center gap-4">
              <a href="#productos" className="btn-primary">
                Ver productos
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#historia" className="btn-ghost">
                Nuestra historia
              </a>
            </div>

            {/* Trust badges */}
            <ul className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-crema-200 pt-6">
              {trustBadges.map((b) => (
                <li key={b.label} className="flex items-center gap-2 text-sm font-medium text-tinta-700">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-crema-100 text-barro-600">
                    <b.icon className="h-4 w-4" />
                  </span>
                  {b.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual column */}
          <div className="relative lg:col-span-6 xl:col-span-7">
            <div className="reveal reveal-delay-1 grid grid-cols-6 gap-3 sm:gap-4">
              {/* Main image */}
              <figure className="relative col-span-4 overflow-hidden rounded-4xl border border-crema-200 shadow-soft-lg">
                <img
                  src="https://images.pexels.com/photos/34230986/pexels-photo-34230986.jpeg?auto=compress&cs=tinysrgb&w=900&h=1080"
                  alt="Manos de un alfarero dando forma a la arcilla en un torno"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-spring hover:scale-105"
                  loading="eager"
                  width={900}
                  height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tinta-900/40 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-crema-50">
                  <span className="text-[0.7rem] uppercase tracking-[0.2em]">El oficio</span>
                  <span className="font-display text-sm italic">Alfarería</span>
                </figcaption>
              </figure>

              {/* Side stack */}
              <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
                <figure className="relative overflow-hidden rounded-4xl border border-crema-200 shadow-soft">
                  <img
                    src="https://images.pexels.com/photos/5656671/pexels-photo-5656671.jpeg?auto=compress&cs=tinysrgb&w=450&h=520"
                    alt="Telas peruanas tejidas a mano con colores vivos"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-spring hover:scale-110"
                    loading="lazy"
                    width={450}
                    height={520}
                  />
                </figure>

                <div className="animate-float-slow flex flex-1 flex-col justify-center rounded-4xl bg-gradient-warm p-5 text-crema-50 shadow-warm">
                  <p className="font-display text-4xl font-light leading-none">100%</p>
                  <p className="mt-2 text-xs leading-tight opacity-90">
                    Hecho a mano por artesanos cajamarquinos.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating rating card */}
            <div className="reveal reveal-delay-2 absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl border border-crema-200 bg-crema-50/95 px-5 py-4 shadow-soft-lg backdrop-blur-sm sm:right-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 text-ocre-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="mt-1 text-xs font-medium text-tinta-700">+500 valoraciones</span>
              </div>
              <div className="h-9 w-px bg-crema-300" />
              <div>
                <p className="font-display text-2xl leading-none text-barro-700">40+</p>
                <p className="text-xs text-tinta-600">Artesanos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="reveal mt-20 border-y border-crema-200 py-5 md:mt-28">
          <div className="mask-fade-x overflow-hidden">
            <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
              {[...Array(2)].flatMap((_, dup) =>
                ['Cerámica', 'Textilería', 'Joyería', 'Madera', 'Hecho a mano', 'Cajamarca', 'Oficio andino'].map((w) => (
                  <span key={`${w}-${dup}`} className="flex items-center gap-12">
                    <span className="font-display text-xl font-light italic text-tinta-700/70">{w}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-barro-400" />
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
