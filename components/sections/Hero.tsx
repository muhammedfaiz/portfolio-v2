"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const EASE = [0.65, 0, 0.35, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-6 md:grid-cols-2 md:px-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mono-label mb-6 text-[var(--color-ink-dim)]"
          >
            FULL STACK DEVELOPER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-[var(--color-ink)] sm:text-6xl md:text-7xl"
          >
            I BUILD DIGITAL EXPERIENCES THAT MOVE.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="mono-label mt-6 text-[var(--color-accent)]"
          >
            MERN · SHOPIFY · E-COMMERCE
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-ink-soft)] md:text-lg"
          >
            From interfaces and APIs to e-commerce systems and cloud
            infrastructure — I build products from idea to deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href="#work"
              data-cursor="cta"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-[var(--color-accent)]/20"
            >
              View my work
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              data-cursor="cta"
              className="mono-label text-[var(--color-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
            >
              Let&rsquo;s talk
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}
