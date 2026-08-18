"use client";

import { shopifyBrands } from "@/data/shopifyBrands";

export default function ShopifyBrandViewer({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  const brand = shopifyBrands[active];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-bg font-sans">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        {shopifyBrands.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => onSelect(i)}
            className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide transition-colors ${
              i === active
                ? "border-accent/50 bg-accent/15 text-ink"
                : "border-line text-ink-dim hover:text-ink-soft"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>
      <div className="relative flex-1 overflow-hidden">
        <img
          key={brand.id}
          src={brand.image}
          alt={`${brand.name} storefront`}
          className="h-full w-full object-cover object-top"
        />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
          <span className="text-[11px] font-semibold text-white">{brand.name}</span>
        </div>
      </div>
    </div>
  );
}
