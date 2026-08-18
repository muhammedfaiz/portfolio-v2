"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(Math.max((value - inMin) / (inMax - inMin), 0), 1);
  return outMin + t * (outMax - outMin);
}

const stack = [
  { label: "FRONTEND", value: "React, Next.js, TypeScript" },
  { label: "BACKEND", value: "Node.js, Express, MongoDB, PostgreSQL" },
  { label: "COMMERCE / CLOUD", value: "Shopify, Liquid, AWS, Razorpay" },
];

export default function About() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    function handleScroll() {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.05 + i * 0.2;
        const end = start + 0.3;
        const opacity = mapRange(progress, start, end, 0, 1);
        const y = mapRange(progress, start, end, 40, 0);
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${y}px)`;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, reducedMotion]);

  const textBlock = (
    <div>
      <div className="mono-label mb-4 text-ink-dim">ABOUT</div>
      <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        ENGINEERING WITH A CREATIVE MINDSET.
      </h2>
      <p className="mt-8 max-w-md leading-relaxed text-ink-soft">
        I enjoy working across the entire product lifecycle — from designing
        interfaces and building frontend experiences to architecting APIs,
        databases and cloud infrastructure. I&rsquo;ve shipped production work
        across 20+ client platforms, from real-time booking systems to
        e-commerce infrastructure handling live payments.
      </p>
    </div>
  );

  const cards = (
    <div className="space-y-4">
      {stack.map((item, i) => (
        <div
          key={item.label}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="rounded-2xl border border-line bg-surface p-6"
          style={{ marginLeft: isMobile ? 0 : `${i * 1.5}rem` }}
        >
          <div className="mono-label mb-2 text-accent">{item.label}</div>
          <div className="text-sm text-ink-soft">{item.value}</div>
        </div>
      ))}
    </div>
  );

  if (isMobile || reducedMotion) {
    return (
      <section id="about" className="px-6 py-20">
        <div className="mx-auto max-w-xl space-y-10">
          {textBlock}
          {cards}
        </div>
      </section>
    );
  }

  return (
    <section id="about" ref={wrapRef} className="relative z-10 bg-bg" style={{ height: "170vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-bg px-6 md:px-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-2">
          {textBlock}
          {cards}
        </div>
      </div>
    </section>
  );
}
