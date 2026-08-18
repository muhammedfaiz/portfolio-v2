export default function SpeedServiceScreen() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-bg font-sans">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-display text-xs font-bold text-ink">Speed Service</span>
        <span className="status-dot h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
      </div>

      <div className="relative mx-3 flex-1 overflow-hidden rounded-md border border-line bg-surface">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-accent/30" />
        <div className="absolute left-[30%] top-[35%] h-2 w-2 rounded-full bg-ink-dim" />
        <div className="absolute left-[68%] top-[62%] h-2 w-2 rounded-full bg-ink-dim" />
      </div>

      <div className="m-3 rounded-md border border-line bg-surface p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-ink">Plumbing · 2.3km</div>
            <div className="mono-label mt-1 text-ink-dim">Employee en route</div>
          </div>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[10px] font-mono uppercase text-ink">
            Book
          </span>
        </div>
      </div>

      <div className="mx-3 mb-3 flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-[10px] text-ink">Booking confirmed</span>
      </div>
    </div>
  );
}
