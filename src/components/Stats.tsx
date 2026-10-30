import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { end: 40, suffix: '+', label: 'Artesanos apoyados' },
  { end: 12, suffix: '', label: 'Comunidades de Cajamarca' },
  { end: 100, suffix: '%', label: 'Hecho a mano' },
  { end: 5, suffix: '★', label: 'Valoración de clientes' },
];

export default function Stats() {
  return (
    <section className="bg-tinta-950 py-20 text-crema-50 md:py-24">
      <div className="container-aurora">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-5xl border border-tinta-800 bg-tinta-800 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCell key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({
  end,
  suffix,
  label,
  index,
}: {
  end: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const { ref, value } = useCountUp(end);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal reveal-delay-${(index % 4) + 1} group bg-tinta-950 p-8 text-center transition-colors duration-500 hover:bg-tinta-900 md:p-10`}
    >
      <p className="font-display text-5xl font-light text-ocre-300 transition-transform duration-500 group-hover:scale-105 md:text-6xl">
        {value}
        <span className="text-barro-300">{suffix}</span>
      </p>
      <p className="mt-3 text-sm text-crema-100/70">{label}</p>
    </div>
  );
}
