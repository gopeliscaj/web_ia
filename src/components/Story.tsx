import { Check } from 'lucide-react';

const values = [
  {
    title: 'Compra directa al artesano',
    text: 'El precio que pagas justifica el oficio, sin intermediarios que diluyen el reconocimiento.',
  },
  {
    title: 'Técnicas ancestrales',
    text: 'Métodos que se transmiten de generación en generación, preservando la identidad andina.',
  },
  {
    title: 'Materiales de la región',
    text: 'Arcilla, lana, plata y madera de origen local y sostenible de la zona de Cajamarca.',
  },
  {
    title: 'Piezas irrepetibles',
    text: 'Cada producto es único. Las leves variaciones son parte de su valor, no defectos.',
  },
];

export default function Story() {
  return (
    <section id="historia" className="relative overflow-hidden bg-tinta-950 py-24 text-crema-50 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-[0.03]" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 right-[20%] h-[26rem] w-[26rem] rounded-full bg-barro-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-[5%] h-[20rem] w-[20rem] rounded-full bg-andino-600/20 blur-[120px]" />
      </div>

      <div className="container-aurora">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          {/* Left sticky */}
          <div className="md:col-span-5">
            <div className="reveal md:sticky md:top-28">
              <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-ocre-300">
                <span className="h-px w-8 bg-ocre-300/50" />
                Nuestra historia
              </span>
              <h2 className="mt-6 font-display text-fluid-h2 font-light leading-[1.02] text-crema-50">
                Un puente entre el
                <br />
                <span className="italic text-ocre-300">arte andino</span>
                <br />
                y tu hogar.
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-crema-100/75">
                Nacimos en Cajamarca para conectar a artesanos con personas que valoran
                lo hecho a mano. Trabajamos directamente con los talleres, sin
                intermediarios, para que el reconocimiento llegue a quien crea.
              </p>

              <div className="mt-9 flex items-center gap-6 border-t border-tinta-800 pt-7">
                <div>
                  <p className="font-display text-4xl font-light text-ocre-300">2018</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-crema-100/50">Año fundación</p>
                </div>
                <div className="h-12 w-px bg-tinta-800" />
                <div>
                  <p className="font-display text-4xl font-light text-ocre-300">12</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-crema-100/50">Comunidades</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="md:col-span-7">
            <figure className="reveal group relative overflow-hidden rounded-4xl border border-tinta-800">
              <img
                src="https://images.pexels.com/photos/30525160/pexels-photo-30525160.jpeg?auto=compress&cs=tinysrgb&w=1100&h=700"
                alt="Paisaje rural andino con río serpenteante y montañas"
                className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] ease-spring group-hover:scale-105"
                loading="lazy"
                width={1100}
                height={700}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tinta-950/50 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 text-crema-50">
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-ocre-300">Cajamarca</span>
                <p className="mt-1 font-display text-xl italic">La tierra que inspira</p>
              </figcaption>
            </figure>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <li
                  key={v.title}
                  className={`reveal reveal-delay-${(i % 4) + 1} group rounded-3xl border border-tinta-800 bg-tinta-900/40 p-6 transition-all duration-500 ease-spring hover:border-ocre-300/40 hover:bg-tinta-900/70`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ocre-400/15 text-ocre-300 transition-transform duration-500 group-hover:scale-110">
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-medium text-crema-50">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-crema-100/70">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
