"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { links as siteLinks } from "@/data/links";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import Logo from "./Logo";

type NavLink = { href: string; label: string };

export default function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-[var(--color-bg)] px-6 py-6 md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="font-display text-sm font-bold text-[var(--color-ink)]">FAIZ</span>
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="mono-label text-[var(--color-ink)]"
              aria-label="Close menu"
            >
              CLOSE
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="font-display text-4xl font-semibold text-[var(--color-ink)]"
              >
                {l.label}
              </motion.a>
            ))}
          </nav>

          <div className="mono-label flex flex-wrap gap-6 text-[var(--color-ink-dim)]">
            <a href={siteLinks.github} target="_blank" rel="noopener" className="inline-flex items-center gap-2">
              <GitHubIcon className="h-4 w-4" />
              GITHUB
            </a>
            <a href={siteLinks.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-2">
              <LinkedInIcon className="h-4 w-4" />
              LINKEDIN
            </a>
            <a href={`mailto:${siteLinks.email}`} className="inline-flex items-center gap-2">
              <MailIcon className="h-4 w-4" />
              EMAIL
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
