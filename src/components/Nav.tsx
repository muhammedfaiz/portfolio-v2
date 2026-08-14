import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-5">
      <nav
        className={`flex items-center gap-7 px-5 py-3 rounded-full border backdrop-blur-md transition-shadow duration-300 ${
          scrolled
            ? "border-white/15 bg-white/[0.06] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"
            : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <a href="#top" className="font-display font-bold text-sm pr-4 border-r border-white/10">
          FAIZ<span className="bg-gradient-to-r from-pink to-cyan bg-clip-text text-transparent">.DEV</span>
        </a>
        <div className="hidden md:flex gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-mono text-xs text-ink-soft hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}