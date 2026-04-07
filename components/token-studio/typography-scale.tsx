"use client";

import type { TypeStep } from "@/lib/typography";

interface TypographyScaleProps {
  scale: TypeStep[] | null;
  brandColor?: string;
}

export function TypographyScale({ scale, brandColor }: TypographyScaleProps) {
  if (!scale) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex animate-pulse items-baseline gap-4 border-b border-border pb-3"
          >
            <div className="h-3 w-10 rounded bg-muted" />
            <div className="h-3 w-12 rounded bg-muted" />
            <div className="h-6 flex-1 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {[...scale].reverse().map((step, i) => (
        <div
          key={step.name}
          className="flex items-baseline gap-6 border-b border-border py-3 last:border-0"
          style={{
            animationDelay: `${i * 40}ms`,
          }}
        >
          <div className="w-10 shrink-0">
            <span className="font-mono text-xs text-muted-foreground">{step.name}</span>
          </div>
          <div className="w-14 shrink-0 text-right">
            <span className="font-mono text-xs text-muted-foreground">
              {step.sizePx.toFixed(1)}px
            </span>
          </div>
          <p
            className="min-w-0 flex-1 overflow-hidden text-nowrap font-sans text-foreground"
            style={{
              fontSize: `${step.sizePx}px`,
              lineHeight: step.lineHeight,
            }}
          >
            The quick brown fox
          </p>
        </div>
      ))}
    </div>
  );
}
