"use client";

import { useEffect, useState } from "react";
import { links } from "@/data/links";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/icons";

type GithubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

export default function GithubStats() {
  const [user, setUser] = useState<GithubUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadGithub() {
      try {
        const res = await fetch("https://api.github.com/users/muhammedfaiz");
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data = await res.json();
        if (!cancelled) setUser(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadGithub();
    return () => {
      cancelled = true;
    };
  }, []);

  const username = links.github.split("/").pop();

  return (
    <section id="github" className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
      <div className="mono-label mb-4 text-ink-dim">LIVE FROM THE SOURCE</div>
      <h2 className="mb-12 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        GITHUB
      </h2>

      <div className="rounded-2xl border border-line bg-surface p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <span className="mono-label inline-flex min-w-0 items-center gap-2 text-ink-soft">
            <GitHubIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">github.com/{username}</span>
          </span>
          <a
            href={links.github}
            target="_blank"
            rel="noopener"
            data-cursor="cta"
            className="mono-label inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-ink transition-colors hover:border-accent/60"
          >
            View profile
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 sm:gap-10">
          <div>
            <div className="font-display text-3xl font-bold text-accent">
              {user ? user.public_repos : "—"}
            </div>
            <div className="mono-label mt-1 text-ink-dim">Public repos</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-accent">
              {user ? user.followers : "—"}
            </div>
            <div className="mono-label mt-1 text-ink-dim">Followers</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="font-display text-3xl font-bold text-accent">
              {user ? user.following : "—"}
            </div>
            <div className="mono-label mt-1 text-ink-dim">Following</div>
          </div>
        </div>

        {/* Fixed min-width + horizontal scroll on narrow screens — squeezing
            this chart down to mobile width shrinks each day-cell to an
            illegible dot. Desktop containers are already wider than the
            min-width, so this has no effect there. */}
        <div className="overflow-x-auto overflow-y-hidden rounded-xl border border-line bg-black/20">
          <img
            src={`https://ghchart.rshah.org/4da8ff/${username}`}
            alt={`${username}'s GitHub contribution graph`}
            loading="lazy"
            className="w-full min-w-[600px]"
          />
        </div>

        <div className="mono-label mt-4 text-ink-dim">
          Stats and contribution graph load live from the GitHub API — not static screenshots.
        </div>
      </div>
    </section>
  );
}
