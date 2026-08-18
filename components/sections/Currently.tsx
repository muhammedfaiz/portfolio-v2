export default function Currently() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-16">
      <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-10 md:flex-row md:items-center">
        <div>
          <h2 className="mono-label mb-3 text-ink-dim">CURRENTLY BUILDING</h2>
          <p className="font-display text-2xl font-semibold text-ink md:text-3xl">
            Digital products · Shopify experiences · Full-stack applications
          </p>
        </div>

        <div className="mono-label flex items-center gap-2.5 whitespace-nowrap text-ink">
          <span className="status-dot h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
          AVAILABLE FOR SELECT PROJECTS
        </div>
      </div>
    </section>
  );
}
