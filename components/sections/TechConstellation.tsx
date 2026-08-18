"use client";

import dynamic from "next/dynamic";
import { technologies } from "@/data/technologies";

const TechConstellationScene = dynamic(
  () => import("@/components/three/TechConstellationScene"),
  { ssr: false },
);

export default function TechConstellation() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="mono-label mb-4 text-ink-dim">TECHNOLOGY</div>
        <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          THE SYSTEM I BUILD WITH
        </h2>
        <p className="mono-label mt-4 text-ink-dim">
          <span className="pointer-coarse:hidden">Drag to spin · hover a node for details</span>
          <span className="hidden pointer-coarse:inline">Drag to spin · tap a node for details</span>
        </p>
      </div>

      <div className="mt-8">
        <TechConstellationScene />
      </div>

      {/* Accessible fallback — the 3D scene above is aria-hidden since its
          orbiting tags are the only place this list otherwise appears. */}
      <ul className="sr-only">
        {technologies.map((tech) => (
          <li key={tech.name}>
            {tech.name}: {tech.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
