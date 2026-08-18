"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSceneStore } from "@/lib/store";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    function updateProgress() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);
    }

    if (reducedMotion) {
      // Native scroll only — no Lenis, no rAF-driven ScrollTrigger updates.
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
      return () => window.removeEventListener("scroll", updateProgress);
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      updateProgress();
    });

    function raf(time: number) {
      // gsap.ticker reports elapsed time in seconds; Lenis expects a
      // performance.now()-style millisecond timestamp for its internal clock.
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    updateProgress();

    // Deliberately no manual ScrollTrigger.refresh() here. Each pin-creating component
    // (Experience, ProcessScene, WorkChapterScene) waits for a `ready` flag before ever
    // creating its trigger, so it always measures correct, settled layout at creation
    // time — and web fonts use display:"optional" (app/layout.tsx) specifically so they
    // never swap in after paint. A blind/reactive refresh call used to live here, but
    // refreshing while a user is actively inside a pinned section recalculates that
    // pin's start/end against current layout, and even a tiny shift can make the
    // current scroll position fall outside the new range — causing a visible
    // jump-then-snap-back. GSAP's own resize-triggered refresh still covers real
    // layout changes (e.g. window resize); don't add another one on a timer.

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion, setScrollProgress]);

  return <>{children}</>;
}
