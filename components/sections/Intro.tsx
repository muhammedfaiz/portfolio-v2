"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const words = ["DESIGN.", "CODE.", "SYSTEMS.", "EXPERIENCE."];

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const wordsWrapRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const wordEls = gsap.utils.toArray<HTMLElement>(".intro-word", wordsWrapRef.current);

      gsap.set(maskRef.current, { yPercent: 100 });
      gsap.set(wordEls, { opacity: 0.15 });
      gsap.set(paraRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          // A numeric scrub (vs. `true`) adds a small catch-up lag instead of
          // tracking raw scroll delta 1:1 — imperceptible on desktop wheel/
          // trackpad input, but it absorbs the jumpiness of real touch scroll
          // (especially iOS's elastic rubber-band overscroll at section
          // boundaries), which otherwise reads as the animation "floppily"
          // overshooting and springing back in sync with the bounce.
          scrub: 0.5,
        },
      });

      tl.to(maskRef.current, { yPercent: 0, duration: 1, ease: "power3.out" })
        .to(wordEls, { opacity: 1, stagger: 0.5, duration: 0.4 }, "+=0.1")
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative z-10 bg-bg"
      style={{ height: reducedMotion ? "auto" : "180vh" }}
    >
      <div className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden bg-bg px-6 py-24 md:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="overflow-hidden">
            <div ref={maskRef} className={reducedMotion ? "" : ""}>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
                I TURN IDEAS INTO DIGITAL PRODUCTS.
              </h2>
            </div>
          </div>

          <div
            ref={wordsWrapRef}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 md:mt-16"
          >
            {words.map((w) => (
              <span
                key={w}
                className="intro-word font-display text-3xl font-semibold text-[var(--color-ink-dim)] sm:text-4xl md:text-5xl"
              >
                {w}
              </span>
            ))}
          </div>

          <p
            ref={paraRef}
            className="mt-12 max-w-xl text-base leading-relaxed text-[var(--color-ink-soft)] md:mt-16 md:text-lg"
          >
            I work across frontend development, backend systems, e-commerce,
            APIs, databases, cloud infrastructure and Shopify to turn ideas
            into production-ready experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
