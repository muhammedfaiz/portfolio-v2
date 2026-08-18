import { clients } from "@/data/clients";

export default function ClientMarquee() {
  return (
    <section className="border-y border-line py-32 md:py-40">
      <div className="mono-label mb-10 text-center text-ink-dim">
        Trusted by 20+ client platforms
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex w-max gap-16 animate-marquee">
          {[...clients, ...clients].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-xl font-semibold text-ink-soft/60 md:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
