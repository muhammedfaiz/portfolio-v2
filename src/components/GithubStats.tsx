import { useEffect, useState } from "react";

type GithubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

export default function GithubStats() {
  const [user, setUser] = useState<GithubUser | null>(null);

  useEffect(() => {
    async function loadGithub() {
      try {
        const res = await fetch("https://api.github.com/users/muhammedfaiz");
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        // user stays null — the UI below already handles that gracefully
      }
    }
    loadGithub();
  }, []);

  return (
    <section id="github" className="px-8 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-xs tracking-widest text-pink uppercase mb-4">
          04. GitHub
        </div>
        <h2 className="font-display font-bold text-4xl mb-12">
          Live from the source
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <span className="font-mono text-sm text-ink-soft">
              github.com/muhammedfaiz
            </span>
            <a
              href="https://github.com/muhammedfaiz"
              target="_blank"
              rel="noopener"
              className="px-5 py-2.5 rounded-full font-mono text-xs border border-white/10 bg-white/5"
            >
              View profile ↗
            </a>
          </div>

          <div className="flex gap-10 flex-wrap mb-8">
            <div>
              <div className="font-display font-bold text-3xl bg-gradient-to-r from-pink to-cyan bg-clip-text text-transparent">
                {user ? user.public_repos : "—"}
              </div>
              <div className="font-mono text-xs text-ink-dim uppercase mt-1">
                Public repos
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-3xl bg-gradient-to-r from-pink to-cyan bg-clip-text text-transparent">
                {user ? user.followers : "—"}
              </div>
              <div className="font-mono text-xs text-ink-dim uppercase mt-1">
                Followers
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-3xl bg-gradient-to-r from-pink to-cyan bg-clip-text text-transparent">
                {user ? user.following : "—"}
              </div>
              <div className="font-mono text-xs text-ink-dim uppercase mt-1">
                Following
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20">
            <img
              src="https://ghchart.rshah.org/FF6B9D/muhammedfaiz"
              alt="Muhammed Faiz's GitHub contribution graph"
              loading="lazy"
              className="w-full"
            />
          </div>

          <div className="font-mono text-xs text-ink-dim mt-4">
            Stats and contribution graph load live from the GitHub API — not static screenshots.
          </div>
        </div>
      </div>
    </section>
  );
}