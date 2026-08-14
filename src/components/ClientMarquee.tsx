export default function ClientMarquee() {
  const clients = [
    "Beenext", "Benefic", "Ethik", "Dodo Baby", "Neesh", "Extrokids",
    "Tvishi", "Perfora", "FitTreats", "NutriOrg", "Zenue Beauty",
    "Vetycos", "Happi Planet", "Kreo", "Indoor Harvest", "Cove & Lane",
    "Rabitat", "Conscious Chemist", "Bombay Shaving Company",
    "Formial Labs", "Indoin",
  ];

  return (
    <section className="py-20 border-y border-white/10 overflow-hidden">
      <div className="font-mono text-xs tracking-widest text-ink-dim uppercase text-center mb-10">
        Trusted by 20+ client platforms
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex gap-16 w-max animate-marquee">
          {[...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="font-display font-semibold text-2xl text-ink-soft/60 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}