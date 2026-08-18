"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSceneStore } from "@/lib/store";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function PageLoader() {
  const reducedMotion = usePrefersReducedMotion();
  const setLoaderDone = useSceneStore((s) => s.setLoaderDone);
  const [stage, setStage] = useState<"mark" | "role" | "done">("mark");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (reducedMotion) {
      const t = setTimeout(() => {
        setVisible(false);
        setLoaderDone(true);
        document.body.style.overflow = "";
      }, 300);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setStage("role"), 320);
    const t2 = setTimeout(() => setStage("done"), 780);
    const t3 = setTimeout(() => {
      setVisible(false);
      setLoaderDone(true);
      document.body.style.overflow = "";
    }, 1080);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reducedMotion, setLoaderDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.45, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative h-16 w-16">
              <span className="absolute inset-0 rounded-full border border-white/15" />
              <span
                className="absolute inset-[3px] rounded-full border-t border-[var(--color-accent)] animate-spin"
                style={{ animationDuration: "1.6s" }}
              />
              <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </div>

            <div className="font-display font-bold text-2xl tracking-tight text-[var(--color-ink)]">
              FAIZ
            </div>

            <AnimatePresence mode="wait">
              {stage !== "mark" && (
                <motion.div
                  key="role"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mono-label text-[var(--color-ink-dim)]"
                >
                  FULL STACK DEVELOPER
                </motion.div>
              )}
            </AnimatePresence>

            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-[var(--color-accent)]"
                initial={{ x: "-100%" }}
                animate={{ x: stage === "mark" ? "-40%" : "0%" }}
                transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
