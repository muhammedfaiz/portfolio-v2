import { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const roles = [
  {
    role: "Full Stack Developer",
    org: "Troopod, India (Remote)",
    date: "Dec 2024 — Present",
    points: [
      "Built and maintained production MERN apps across 20+ client platforms",
      "Cut page load time by 30% via frontend/backend optimization",
      "Integrated Razorpay and PayPal into production checkout flows",
    ],
  },
  {
    role: "Freelance Developer",
    org: "Independent",
    date: "2023 — Present",
    points: [
      "Pipagro — custom Shopify store, optimized checkout flow",
      "Liflic — corporate WordPress site, hardened asset security",
    ],
  },
  {
    role: "Advanced MERN Certification",
    org: "Brototype, Ernakulam",
    date: "2023 — 2024",
    points: ["Project-based certification in full MERN + deployment practices"],
  },
  {
    role: "BCA, Computer Applications",
    org: "MES Kalladi College, Calicut",
    date: "2020 — 2023",
    points: ["CGPA 7.5 / 10"],
  },
];

export default function Experience() {
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    function handleScroll() {
      if (!wrapRef.current || !trackRef.current) return;

      const rect = wrapRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth =
        trackRef.current.parentElement?.clientWidth ?? window.innerWidth;
      const maxTranslate = Math.max(trackWidth - viewportWidth, 0);

      trackRef.current.style.transform = `translateX(${-progress * maxTranslate}px)`;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  function roleCard(r: (typeof roles)[number]) {
    return (
      <div
        key={r.role}
        className="min-w-[280px] md:min-w-[340px] flex-shrink-0 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
      >
        <div className="font-mono text-xs text-cyan mb-3">{r.date}</div>
        <h3 className="font-display font-bold text-xl mb-1">{r.role}</h3>
        <div className="text-ink-soft text-sm mb-4">{r.org}</div>
        <ul className="space-y-2 text-sm text-ink-soft">
          {r.points.map((p) => (
            <li key={p}>→ {p}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (isMobile) {
    return (
      <section id="experience" className="py-20">
        <div className="px-6 mb-8">
          <div className="font-mono text-xs tracking-widest text-pink uppercase mb-4">
            03. Experience
          </div>
          <h2 className="font-display font-bold text-3xl">
            Where I've been building
          </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 pb-6 snap-x snap-mandatory">
          {roles.map((r) => (
            <div key={r.role} className="snap-start">
              {roleCard(r)}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={wrapRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-8 md:px-16 mb-12">
          <div className="font-mono text-xs tracking-widest text-pink uppercase mb-4">
            03. Experience
          </div>
          <h2 className="font-display font-bold text-4xl">
            Where I've been building
          </h2>
        </div>

        <div className="relative py-4 overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-pink/40 pointer-events-none z-10" />
          <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink pointer-events-none z-10" />

          <div ref={trackRef} className="flex gap-8 px-8 md:px-16 w-max">
            {roles.map((r) => roleCard(r))}
          </div>
        </div>
      </div>
    </section>
  );
}