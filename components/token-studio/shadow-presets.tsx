"use client";

import type { ShadowSet } from "@/lib/shadows";

interface ShadowPresetsProps {
  shadows: ShadowSet | null;
}

const SHADOW_LABELS: { key: keyof ShadowSet; label: string; desc: string }[] = [
  { key: "sm", label: "sm", desc: "Subtle lift" },
  { key: "md", label: "md", desc: "Card elevation" },
  { key: "lg", label: "lg", desc: "Dropdown" },
  { key: "xl", label: "xl", desc: "Modal" },
  { key: "2xl", label: "2xl", desc: "Overlay" },
];

export function ShadowPresets({ shadows }: ShadowPresetsProps) {
  if (!shadows) {
    return (
      <div className="flex flex-wrap gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex animate-pulse flex-col items-center gap-3">
            <div className="h-20 w-24 rounded-lg bg-muted" />
            <div className="h-3 w-8 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8">
      {SHADOW_LABELS.map(({ key, label, desc }) => (
        <div key={key} className="flex flex-col items-center gap-3">
          <div
            className="h-20 w-24 rounded-lg bg-muted"
            style={{ boxShadow: shadows[key] }}
          />
          <div className="text-center">
            <p className="font-mono text-xs font-medium text-foreground">{label}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
