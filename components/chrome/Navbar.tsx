"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const links = [
  { href: "#work", label: "WORK" },
  { href: "#about", label: "ABOUT" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar() {
  const reducedMotion = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Keep the nav persistently visible under reduced motion — a stable
      // landmark is more useful than a hide-on-scroll effect for keyboard/
      // screen reader navigation, and it removes a motion cue some users
      // asked to avoid.
      setHidden(!reducedMotion && y > lastY.current && y > 160);
      lastY.current = y;
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
      >
        <div
          className={`flex items-center justify-between px-6 py-5 transition-[background-color,border-color,backdrop-filter] duration-500 md:px-16 ${
            scrolled
              ? "border-b border-[var(--color-line)] bg-[var(--color-bg)]/70 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-display text-sm font-bold tracking-tight text-[var(--color-ink)]">
              FAIZ
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative mono-label text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="mono-label text-[var(--color-ink)] md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            MENU
          </button>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />
    </>
  );
}
