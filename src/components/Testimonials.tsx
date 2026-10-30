import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'El cuenco llegó impecable y con un aroma a oficio. Se nota que cada pieza es única.',
    author: 'Cliente de Lima',
    role: 'Compra de cerámica',
  },
  {
    quote:
      'La manta andina es aún más bella en persona. La textura y los colores son extraordinarios.',
    author: 'Cliente de Trujillo',
    role: 'Compra de textilería',
  },
  {
    quote:
      'Compré para regalar y fue un éxito. Llegó rápido y bien empacado. Repetiré sin duda.',
    author: 'Cliente de Cajamarca',
    role: 'Compra de joyería',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-crema-50 py-24 md:py-32">
      <div className="container-aurora">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Lo que dicen
            </span>
            <h2 className="mt-5 font-display text-fluid-h2 font-light leading-[1.02]">
              Compras que
              <br />
              <span className="italic text-gradient-warm">enamoran</span>.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-ocre-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-tinta-700">4.9 / 5 · +500 reseñas</span>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} card-surface card-hover flex flex-col p-8`}
            >
              <div className="flex items-center gap-1 text-ocre-400">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl font-light italic leading-relaxed text-tinta-800">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-crema-200 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-warm font-display text-base font-medium text-crema-50">
                  {t.author.charAt(8)}
                </span>
                <div>
                  <p className="font-medium text-tinta-900">{t.author}</p>
                  <p className="mt-0.5 text-sm text-barro-600">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
