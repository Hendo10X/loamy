"use client";

import type { SpacingStep } from "@/lib/spacing";

interface SpacingScaleProps {
  scale: SpacingStep[] | null;
  brandColor?: string;
}

const VISUAL_STEPS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16];

export function SpacingScale({ scale, brandColor }: SpacingScaleProps) {
  if (!scale) {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="flex animate-pulse flex-col gap-1.5">
            <div className="h-6 w-8 rounded bg-muted" />
            <div className="h-3 w-6 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  const visibleSteps = scale.filter((s) => VISUAL_STEPS.includes(parseFloat(s.name)));
  const maxValue = Math.max(...visibleSteps.map((s) => s.value));

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-end gap-2 pb-1">
        {visibleSteps.map((step) => {
          const barWidth = step.value === 0 ? 4 : Math.min(Math.max(step.value, 4), 200);
          return (
            <div key={step.name} className="flex flex-col items-start gap-1.5">
              <div
                className="rounded-sm transition-all duration-300"
                style={{
                  width: `${barWidth}px`,
                  height: "24px",
                  backgroundColor: brandColor ?? "oklch(0.6 0 0)",
                  opacity: 0.15 + (step.value / (maxValue || 1)) * 0.6,
                }}
              />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] font-medium text-foreground">
                  {step.name}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">{step.value}px</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
