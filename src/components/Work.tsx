import { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  const t = Math.min(Math.max((value - inMin) / (inMax - inMin), 0), 1);
  return outMin + t * (outMax - outMin);
}

export default function Work() {
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement>(null);
  const feature1Ref = useRef<HTMLLIElement>(null);
  const feature2Ref = useRef<HTMLLIElement>(null);
  const feature3Ref = useRef<HTMLLIElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isMobile) return;

    function updateItem(
      ref: React.RefObject<HTMLElement | null>,
      progress: number,
      start: number,
      end: number,
    ) {
      if (!ref.current) return;
      const opacity = mapRange(progress, start, end, 0, 1);
      const x = mapRange(progress, start, end, 30, 0);
      ref.current.style.opacity = String(opacity);
      ref.current.style.transform = `translateX(${x}px)`;
    }

    function handleScroll() {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      updateItem(feature1Ref, progress, 0.1, 0.35);
      updateItem(feature2Ref, progress, 0.3, 0.55);
      updateItem(feature3Ref, progress, 0.5, 0.75);
      updateItem(linkRef, progress, 0.65, 0.9);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const speedServiceFrame = (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-3 font-mono text-xs text-ink-soft truncate">
          speed-service-tan.vercel.app
        </span>
      </div>
      <iframe
        src="https://speed-service-tan.vercel.app/"
        className="w-full h-[50vh] md:h-[58vh] bg-black"
        loading="lazy"
        title="Speed Service live demo"
      />
    </div>
  );

  const speedServiceDetails = (
    <div>
      <h3 className="font-display font-bold text-2xl mb-2">Speed Service</h3>
      <div className="font-mono text-xs text-ink-soft mb-6">
        Real-time service booking platform
      </div>
      <ul className="space-y-3 mb-8 text-sm text-ink-soft">
        <li ref={feature1Ref}>
          → Role-based auth separating User, Admin, and Employee
        </li>
        <li ref={feature2Ref}>→ Sub-second messaging via Socket.IO</li>
        <li ref={feature3Ref}>→ Live proximity search using Mapbox APIs</li>
      </ul>
      <a
        ref={linkRef}
        href="https://speed-service-tan.vercel.app/"
        target="_blank"
        rel="noopener"
        className="inline-block px-5 py-2.5 rounded-full font-mono text-xs border border-white/10 bg-white/5"
      >
        Open live demo ↗
      </a>
    </div>
  );

  const kicksSection = (
    <div className="px-8 md:px-16 py-24">
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div className="rounded-xl overflow-hidden border border-white/10">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 font-mono text-xs text-ink-soft truncate">
              kicks-1u5a.onrender.com
            </span>
          </div>
          <iframe
            src="https://kicks-1u5a.onrender.com/"
            className="w-full h-[45vh] md:h-[52vh] bg-black"
            loading="lazy"
            title="Kicks live demo"
          />
        </div>

        <div>
          <h3 className="font-display font-bold text-2xl mb-2">Kicks</h3>
          <div className="font-mono text-xs text-ink-soft mb-6">
            Full-stack e-commerce platform
          </div>
          <ul className="space-y-3 mb-8 text-sm text-ink-soft">
            <li>→ Order queue management, inventory tracking, and coupon logic</li>
            <li>→ Referral program to drive repeat customer acquisition</li>
            <li>→ Deployed on AWS EC2 behind a secured NGINX reverse proxy</li>
          </ul>
          <a
            href="https://kicks-1u5a.onrender.com/"
            target="_blank"
            rel="noopener"
            className="inline-block px-5 py-2.5 rounded-full font-mono text-xs border border-white/10 bg-white/5"
          >
            Open live demo ↗
          </a>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <section id="work" className="px-6 py-20">
          <div className="max-w-xl mx-auto">
            <div className="font-mono text-xs tracking-widest text-pink uppercase mb-3">
              02. Work
            </div>
            <h2 className="font-display font-bold text-3xl mb-8">
              Selected builds
            </h2>
            <div className="space-y-8">
              {speedServiceFrame}
              {speedServiceDetails}
            </div>
          </div>
        </section>
        {kicksSection}
      </>
    );
  }

  return (
    <>
      <section
        id="work"
        ref={wrapRef}
        className="relative"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center px-8 md:px-16 overflow-hidden">
          <div className="max-w-6xl mx-auto w-full">
            <div className="font-mono text-xs tracking-widest text-pink uppercase mb-3">
              02. Work
            </div>
            <h2 className="font-display font-bold text-3xl mb-8">
              Selected builds
            </h2>

            <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
              {speedServiceFrame}
              {speedServiceDetails}
            </div>
          </div>
        </div>
      </section>

      {kicksSection}
    </>
  );
}