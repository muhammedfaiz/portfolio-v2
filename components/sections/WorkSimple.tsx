"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import ShopifyBrandViewer from "@/components/three/screens/ShopifyBrandViewer";
import { shopifyBrands } from "@/data/shopifyBrands";
import type { Project } from "@/data/projects";

function ChapterRow({ project, index }: { project: Project; index: number }) {
  const [activeBrand, setActiveBrand] = useState(0);
  const isShopify = project.id === "shopify-experiences";
  const liveHref = isShopify ? shopifyBrands[activeBrand].url : project.liveUrl;

  return (
    <div
      id={index === 0 ? "work" : undefined}
      className="border-t border-line py-16 first:border-t-0 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          {isShopify ? (
            <div className="h-[42vh] md:h-[48vh]">
              <ShopifyBrandViewer active={activeBrand} onSelect={setActiveBrand} />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="mono-label ml-3 truncate text-ink-dim">
                  {new URL(project.liveUrl!).hostname}
                </span>
              </div>
              <iframe
                src={project.liveUrl}
                className="h-[42vh] w-full bg-white md:h-[48vh]"
                loading="lazy"
                title={`${project.title} live demo`}
              />
            </>
          )}
        </div>

        <div className="mt-8">
          <div className="mono-label mb-3 text-accent">
            {project.index} — {project.subtitle}
          </div>
          <h3 className="font-display text-3xl font-bold tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
            {project.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="mono-label rounded-full border border-line px-3 py-1.5 text-ink-dim">
                {t}
              </li>
            ))}
          </ul>
          {liveHref && (
            <a
              href={liveHref}
              target="_blank"
              rel="noopener"
              className="mono-label mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-ink transition-colors hover:border-accent/60"
            >
              {isShopify ? `Visit ${shopifyBrands[activeBrand].name}` : "Open live demo"}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkSimple({ chapters }: { chapters: Project[] }) {
  return (
    <section className="relative py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="mono-label mb-4 text-ink-dim">PROJECTS / 0{chapters.length}</div>
        <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          SELECTED WORK
        </h2>
      </div>

      <div className="mt-8">
        {chapters.map((project, i) => (
          <ChapterRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
