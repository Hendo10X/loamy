"use client";

import { cn } from "@/lib/utils";
import { type PaletteStep, wcagLabel } from "@/lib/color";

interface ColorPaletteProps {
  palette: PaletteStep[] | null;
}

function WcagBadge({ ratio }: { ratio: number }) {
  const label = wcagLabel(ratio);
  return (
    <span
      className={cn(
        "inline-block rounded px-1 py-0.5 font-mono text-[9px] font-semibold leading-none tracking-wide",
        label === "AAA" && "bg-emerald-100 text-emerald-800",
        label === "AA" && "bg-sky-100 text-sky-800",
        label === "AA Large" && "bg-amber-100 text-amber-800",
        label === "Fail" && "bg-red-100 text-red-800",
      )}
    >
      {label}
    </span>
  );
}

export function ColorPalette({ palette }: ColorPaletteProps) {
  if (!palette) {
    return (
      <div className="flex gap-1 overflow-x-auto pb-1">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="h-16 min-w-[52px] flex-1 animate-pulse rounded bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[520px] gap-1">
        {palette.map((swatch) => (
          <div key={swatch.step} className="group flex min-w-0 flex-1 flex-col gap-1">
            <div
              className="h-16 w-full rounded transition-transform duration-150 group-hover:scale-y-110 group-hover:rounded-md"
              style={{ backgroundColor: swatch.hex }}
            />
            <div className="space-y-0.5 px-0.5">
              <p className="font-mono text-[10px] font-medium text-foreground">{swatch.step}</p>
              <p className="hidden font-mono text-[9px] text-muted-foreground sm:block">{swatch.hex}</p>
              <WcagBadge ratio={swatch.wcagOnWhite} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
