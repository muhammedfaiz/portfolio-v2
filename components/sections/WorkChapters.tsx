"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRightIcon } from "@/components/icons";
import ShopifyBrandViewer from "@/components/three/screens/ShopifyBrandViewer";
import { shopifyBrands } from "@/data/shopifyBrands";
import type { Project } from "@/data/projects";

const WorkChapterScene = dynamic(() => import("@/components/three/WorkChapterScene"), {
  ssr: false,
});

function IframeScreen({ url, title }: { url: string; title: string }) {
  return (
    <iframe src={url} title={title} loading="lazy" className="h-full w-full border-0 bg-white" />
  );
}

export default function WorkChapters({ chapters }: { chapters: Project[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeBrand, setActiveBrand] = useState(0);

  const project = chapters[activeChapter];
  const isShopify = project.id === "shopify-experiences";

  const screenContent = isShopify ? (
    <ShopifyBrandViewer active={activeBrand} onSelect={setActiveBrand} />
  ) : (
    <IframeScreen url={project.liveUrl!} title={`${project.title} live site`} />
  );

  const liveHref = isShopify ? shopifyBrands[activeBrand].url : project.liveUrl;

  return (
    <section id="work" ref={wrapRef} className="relative z-10 overflow-hidden bg-bg">
      <div className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mono-label mb-2 text-ink-dim">PROJECTS / 0{chapters.length}</div>
          <h2 className="mb-10 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            SELECTED WORK
          </h2>

          <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <WorkChapterScene
              wrapRef={wrapRef}
              chapterCount={chapters.length}
              onChapterChange={(i) => {
                setActiveChapter(i);
                setActiveBrand(0);
              }}
              screenContent={screenContent}
            />

            <div>
              <div className="mono-label mb-3 text-accent">
                {project.index} — {project.subtitle}
              </div>
              <h3 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
                {project.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="mono-label rounded-full border border-line px-3 py-1.5 text-ink-dim"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {liveHref && (
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noopener"
                  data-cursor="cta"
                  className="mono-label mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-ink transition-colors hover:border-accent/60"
                >
                  {isShopify ? `Visit ${shopifyBrands[activeBrand].name}` : "Open live demo"}
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
            {chapters.map((c, i) => (
              <span
                key={c.id}
                className={`mono-label transition-colors ${
                  i === activeChapter ? "text-accent" : "text-ink-dim"
                }`}
              >
                {c.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
