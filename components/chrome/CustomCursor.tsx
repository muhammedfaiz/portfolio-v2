"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

type CursorVariant = "default" | "link" | "project" | "cta" | "3d";

const VARIANT_LABEL: Record<CursorVariant, string | null> = {
  default: null,
  link: null,
  project: "VIEW",
  cta: "OPEN →",
  "3d": "EXPLORE",
};

const VARIANT_SIZE: Record<CursorVariant, number> = {
  default: 10,
  link: 44,
  project: 110,
  cta: 110,
  "3d": 100,
};

export default function CustomCursor() {
  const coarse = useCoarsePointer();
  const [variant, setVariant] = useState<CursorVariant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 38, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 400, damping: 38, mass: 0.5 });

  useEffect(() => {
    if (coarse) return;
    document.body.setAttribute("data-cursor-ready", "true");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function resolveVariant(target: EventTarget | null): CursorVariant {
      if (!(target instanceof Element)) return "default";
      const explicit = target.closest<HTMLElement>("[data-cursor]");
      if (explicit) {
        const v = explicit.dataset.cursor as CursorVariant;
        if (v && v in VARIANT_LABEL) return v;
      }
      if (target.closest("a, button")) return "link";
      return "default";
    }

    function handleOver(e: MouseEvent) {
      setVariant(resolveVariant(e.target));
    }

    function handleOut(e: MouseEvent) {
      const related = e.relatedTarget;
      setVariant(resolveVariant(related));
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.body.removeAttribute("data-cursor-ready");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [coarse, x, y]);

  if (coarse) return null;

  const size = VARIANT_SIZE[variant];
  const label = VARIANT_LABEL[variant];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full border border-white/15 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor: variant === "default" ? "#F3F1EC" : "rgba(243,241,236,0.08)",
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="mono-label whitespace-nowrap text-[var(--color-ink)]"
        animate={{ opacity: label ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: "0.65rem" }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
