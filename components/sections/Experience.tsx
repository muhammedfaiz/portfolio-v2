"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/experience";
import { useIsMobile } from "@/lib/useIsMobile";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useSceneStore } from "@/lib/store";

const TimelineFragment = dynamic(() => import("@/components/three/TimelineFragment"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

function RoleCard({ entry }: { entry: (typeof experience)[number] }) {
  return (
    <div className="min-w-[280px] flex-shrink-0 rounded-2xl border border-line bg-surface p-6 md:min-w-[360px]">
      <div className="mono-label mb-3 text-accent">{entry.date}</div>
      <h3 className="font-display text-xl font-bold text-ink">{entry.role}</h3>
      <div className="mb-4 mt-1 text-sm text-ink-soft">{entry.org}</div>
      <ul className="space-y-2 text-sm text-ink-soft">
        {entry.points.map((p) => (
          <li key={p}>→ {p}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const workScenePinned = useSceneStore((s) => s.workScenePinned);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // useIsMobile() starts false and corrects itself after mount. Rendering the
  // desktop (pinned) branch during that one-tick window — then swapping to the
  // mobile branch once it resolves — creates a real GSAP pin on a DOM subtree
  // that's about to be replaced, and its ScrollTrigger doesn't always get
  // cleaned up before React tears the tree down, leaving an orphaned
  // pin-spacer permanently reserving scroll space. Wait for both isMobile and
  // this mount flag to resolve together before ever picking a branch.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Intentional hasMounted flag — must fire on the next tick, not during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  useGSAP(
    () => {
      // Work's chapter scene mounts via a dynamic import and can take a while
      // (webpack compiles it on-demand in dev) — it adds a large pin-spacer
      // above this section. Wait for it so this trigger's "top top" start is
      // measured against the page's real height, not a page that's still
      // missing that space. See WorkChapterScene.tsx and lib/store.ts.
      if (
        !ready ||
        !workScenePinned ||
        isMobile ||
        reducedMotion ||
        !wrapRef.current ||
        !trackRef.current
      )
        return;
      const wrap = wrapRef.current;
      const track = trackRef.current;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - wrap.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${track.scrollWidth - wrap.clientWidth}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: wrapRef, dependencies: [ready, workScenePinned, isMobile, reducedMotion] },
  );

  const header = (
    <div className="mx-auto max-w-7xl px-6 md:px-16">
      <div className="mono-label mb-4 text-ink-dim">EXPERIENCE</div>
      <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        WHERE I&rsquo;VE BEEN BUILDING
      </h2>
    </div>
  );

  if (!ready || isMobile) {
    return (
      <section id="experience" className="py-20">
        <div className="mb-10">{header}</div>
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6">
          {experience.map((entry) => (
            <div key={entry.role} className="snap-start">
              <RoleCard entry={entry} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="experience" ref={wrapRef} className="relative z-10 overflow-hidden bg-bg">
      <div className="flex h-screen flex-col justify-center">
        <div className="mb-12">{header}</div>
        <div className="relative overflow-visible py-4">
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 z-0 w-px bg-accent/20" />
          <TimelineFragment reducedMotion={reducedMotion} />
          <div ref={trackRef} className="flex w-max gap-8 px-6 md:px-16">
            {experience.map((entry) => (
              <RoleCard key={entry.role} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
