export default function ShopifyScreen() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-bg font-sans">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-display text-sm font-bold text-ink">STOREFRONT</span>
        <div className="flex items-center gap-4">
          <span className="mono-label text-ink-dim">SEARCH</span>
          <span className="rounded-full border border-line px-2 py-1 text-[10px] text-ink">
            Cart · 2
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between rounded-md border border-line bg-surface px-5 py-4">
          <div>
            <span className="mono-label text-accent">NEW COLLECTION</span>
            <div className="mt-1 font-display text-base font-bold text-ink">
              Designed for modern brands
            </div>
          </div>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[10px] font-mono uppercase text-ink">
            Explore
          </span>
        </div>

        <div className="grid flex-1 grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col justify-between rounded-md border border-line bg-surface p-3">
              <div className="h-12 w-full rounded bg-white/[0.06]" />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-ink-soft">Item {i}</span>
                <span className="text-[10px] font-semibold text-accent">$4{i}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
