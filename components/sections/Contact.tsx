"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { links } from "@/data/links";
import { ArrowRightIcon, CheckIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

const PortalScene = dynamic(() => import("@/components/three/PortalScene"), {
  ssr: false,
});

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [ctaActive, setCtaActive] = useState(false);
  const [openSignal, setOpenSignal] = useState(0);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard write failed:", err);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
      <div className="mono-label mb-4 text-ink-dim">CONTACT</div>

      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-10 md:p-20">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <PortalScene className="h-full w-full" active={ctaActive} openSignal={openSignal} />
        </div>

        <div className="relative z-10">
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            LET&rsquo;S BUILD SOMETHING GREAT.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
            Have an idea, product or e-commerce experience in mind? Let&rsquo;s build it.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${links.email}`}
              data-cursor="cta"
              onMouseEnter={() => setCtaActive(true)}
              onMouseLeave={() => setCtaActive(false)}
              onFocus={() => setCtaActive(true)}
              onBlur={() => setCtaActive(false)}
              onClick={() => setOpenSignal((s) => s + 1)}
              className="mono-label inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-6 py-3 text-ink transition-colors hover:bg-accent/20"
            >
              Start a project
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={handleCopy}
              data-cursor="cta"
              className="mono-label inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-ink transition-colors hover:border-accent/60"
            >
              {copied ? (
                <>
                  Copied <CheckIcon className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Email me <MailIcon className="h-3.5 w-3.5" />
                </>
              )}
            </button>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener"
              className="mono-label inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-ink transition-colors hover:border-accent/60"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener"
              className="mono-label inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-ink transition-colors hover:border-accent/60"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </div>

      <footer className="mono-label mt-12 flex flex-wrap justify-between gap-3 text-ink-dim">
        <span>© {new Date().getFullYear()} Muhammed Faiz</span>
        <span>Built with intent, not a template.</span>
      </footer>
    </section>
  );
}
