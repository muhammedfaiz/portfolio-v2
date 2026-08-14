import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "faizmuhammed342@gmail.com";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard write failed:", err);
    }
  }

  return (
    <section id="contact" className="px-8 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-xs tracking-widest text-pink uppercase mb-4">
          05. Contact
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-12 md:p-16 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 max-w-xl">
              Let's build something that ships.
            </h2>
            <p className="text-ink-soft max-w-lg mb-10">
              I'm looking for full-stack roles — remote-first, open to relocation.
              If you need someone who can own a feature from API to deployment,
              let's talk.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${email}`}
                className="px-6 py-3 rounded-full font-mono text-sm bg-gradient-to-r from-violet to-pink text-white font-semibold"
              >
                Email me →
              </a>

              <button
                onClick={handleCopy}
                className="px-6 py-3 rounded-full font-mono text-sm border border-white/10 bg-white/5"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>

              <a
                href="https://www.linkedin.com/in/muhammed-faiz-630742215/"
                target="_blank"
                rel="noopener"
                className="px-6 py-3 rounded-full font-mono text-sm border border-white/10 bg-white/5"
              >
                LinkedIn ↗
              </a>

              <a
                href="https://github.com/muhammedfaiz"
                target="_blank"
                rel="noopener"
                className="px-6 py-3 rounded-full font-mono text-sm border border-white/10 bg-white/5"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 flex justify-between flex-wrap gap-3 font-mono text-xs text-ink-dim">
        <span>© 2026 Muhammed Faiz</span>
        <span>Built with intent, not a template.</span>
      </footer>
    </section>
  );
}