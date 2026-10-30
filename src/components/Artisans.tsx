import { Quote } from 'lucide-react';

const artisans = [
  {
    name: 'Maestra alfarera',
    craft: 'Cerámica',
    quote: 'Trabajo el barro desde los doce años. Cada cuenco guarda la paciencia del oficio.',
    image:
      'https://images.pexels.com/photos/37372056/pexels-photo-37372056.jpeg?auto=compress&cs=tinysrgb&w=650&h=820',
    alt: 'Alfarera modelando cuencos de arcilla en un taller tradicional',
  },
  {
    name: 'Tejedora andina',
    craft: 'Textilería',
    quote: 'El telar hereda los colores de la tierra y los sueños de mi abuela.',
    image:
      'https://images.pexels.com/photos/17043766/pexels-photo-17043766.jpeg?auto=compress&cs=tinysrgb&w=650&h=820',
    alt: 'Primer plano de telas tejidas a mano con patrones tradicionales',
  },
  {
    name: 'Orfebre de plata',
    craft: 'Joyería',
    quote: 'La plata se moldea con el mismo respeto con el que se escucha una historia.',
    image:
      'https://images.pexels.com/photos/4354624/pexels-photo-4354624.jpeg?auto=compress&cs=tinysrgb&w=650&h=820',
    alt: 'Manos elaborando un arete de plata en un taller de joyería',
  },
];

export default function Artisans() {
  return (
    <section id="artesanos" className="bg-crema-50 py-24 md:py-32">
      <div className="container-aurora">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Las manos detrás
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-fluid-h2 font-light leading-[1.02]">
              Quienes <span className="italic text-gradient-warm">dan vida</span>
              <br />
              a cada pieza.
            </h2>
          </div>
          <p className="max-w-sm text-tinta-700">
            Detrás de cada producto hay un oficio, una comunidad y una historia.
            Acompañamos a los artesanos para que su trabajo llegue más lejos.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {artisans.map((a, i) => (
            <article
              key={a.name}
              className={`reveal reveal-delay-${(i % 3) + 1} group overflow-hidden rounded-4xl border border-crema-200 bg-white shadow-soft transition-all duration-500 ease-spring hover:-translate-y-1.5 hover:shadow-soft-lg`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={a.image}
                  alt={a.alt}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-spring group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tinta-950/85 via-tinta-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-crema-50">
                  <span className="inline-block rounded-full bg-ocre-400/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-tinta-950">
                    {a.craft}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-medium">{a.name}</h3>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6">
                <Quote className="h-8 w-8 shrink-0 text-barro-300" />
                <p className="font-display text-lg italic leading-snug text-tinta-800">
                  {a.quote}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-8 text-xs text-tinta-700/60">
          Perfiles representativos del oficio, sin nombres reales ni atribuciones inventadas.
        </p>
      </div>
    </section>
  );
}
