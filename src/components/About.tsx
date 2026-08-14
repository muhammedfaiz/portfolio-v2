import { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  const t = Math.min(Math.max((value - inMin) / (inMax - inMin), 0), 1);
  return outMin + t * (outMax - outMin);
}

export default function About() {
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    function updateCard(
      ref: React.RefObject<HTMLDivElement | null>,
      progress: number,
      start: number,
      end: number,
    ) {
      if (!ref.current) return;
      const opacity = mapRange(progress, start, end, 0, 1);
      const y = mapRange(progress, start, end, 40, 0);
      ref.current.style.opacity = String(opacity);
      ref.current.style.transform = `translateY(${y}px)`;
    }

    function handleScroll() {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      updateCard(card1Ref, progress, 0.05, 0.35);
      updateCard(card2Ref, progress, 0.25, 0.55);
      updateCard(card3Ref, progress, 0.45, 0.75);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const textBlock = (
    <div>
      <div className="font-mono text-xs tracking-widest text-pink uppercase mb-4">
        01. About
      </div>
      <h2 className="font-display font-bold text-4xl mb-8">
        Who's writing this code
      </h2>
      <p className="text-ink-soft mb-4 leading-relaxed">
        I'm a full-stack developer who's shipped production work across{" "}
        <span className="text-ink font-medium">20+ client platforms</span> —
        from real-time booking systems to e-commerce infrastructure handling
        live payments.
      </p>
      <p className="text-ink-soft leading-relaxed">
        My focus sits at the intersection of building the feature and owning
        what happens after it ships — deployment, uptime, and the small
        performance wins that add up.
      </p>
    </div>
  );

  const cards = (
    <div className="space-y-4">
      <div
        ref={card1Ref}
        className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
      >
        <div className="font-mono text-xs text-cyan mb-2">FRONTEND</div>
        <div className="text-ink-soft text-sm">React, TypeScript, Tailwind</div>
      </div>
      <div
        ref={card2Ref}
        className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md md:ml-6"
      >
        <div className="font-mono text-xs text-pink mb-2">BACKEND</div>
        <div className="text-ink-soft text-sm">Node.js, Express, MongoDB</div>
      </div>
      <div
        ref={card3Ref}
        className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md md:ml-12"
      >
        <div className="font-mono text-xs text-violet mb-2">INFRA</div>
        <div className="text-ink-soft text-sm">AWS EC2, NGINX, SSL</div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <section id="about" className="px-6 py-20">
        <div className="max-w-xl mx-auto space-y-10">
          {textBlock}
          {cards}
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      ref={wrapRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center px-8 md:px-16 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">
          {textBlock}
          {cards}
        </div>
      </div>
    </section>
  );
}