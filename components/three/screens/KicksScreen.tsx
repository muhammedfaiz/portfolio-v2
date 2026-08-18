export default function KicksScreen() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-bg font-sans">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-display text-sm font-bold text-ink">KICKS</span>
        <div className="flex items-center gap-3">
          <span className="mono-label text-ink-dim">SALE</span>
          <span className="h-4 w-4 rounded-sm border border-ink-dim" />
        </div>
      </div>

      <div className="flex flex-1 gap-3 p-4">
        <div className="flex w-2/5 flex-col justify-center gap-2 rounded-md border border-line bg-surface p-4">
          <span className="mono-label text-accent">NEW DROP</span>
          <span className="font-display text-lg font-bold leading-tight text-ink">
            Step into the season
          </span>
          <span className="mt-2 w-fit rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-mono uppercase text-ink">
            Shop now
          </span>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col justify-between rounded-md border border-line bg-surface p-3">
              <div className="h-10 w-full rounded bg-white/[0.06]" />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-ink-soft">Runner {i}</span>
                <span className="text-[10px] font-semibold text-accent">$8{i}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
