"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const ProcessScene = dynamic(() => import("@/components/three/ProcessScene"), {
  ssr: false,
});

const STAGES = ["IDEA", "DESIGN", "CODE", "DEPLOY", "SCALE"];

export default function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section ref={wrapRef} className="relative z-10 overflow-hidden bg-bg">
      <div className="flex h-screen flex-col items-center justify-center px-6 md:px-16">
        <div className="mono-label mb-4 text-ink-dim">PROCESS</div>
        <h2 className="sr-only">How an idea becomes a product</h2>

        <ProcessScene wrapRef={wrapRef} onStageChange={setActiveStage} />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-10">
          {STAGES.map((stage, i) => (
            <span
              key={stage}
              className={`font-display text-xl font-bold tracking-tight transition-all duration-300 md:text-4xl ${
                i === activeStage ? "scale-110 text-accent" : "scale-100 text-ink-dim"
              }`}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
