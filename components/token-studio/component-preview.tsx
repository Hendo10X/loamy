"use client";

import type { PaletteStep } from "@/lib/color";
import type { ShadowSet } from "@/lib/shadows";

interface ComponentPreviewProps {
  palette: PaletteStep[] | null;
  shadows: ShadowSet | null;
}

function get(palette: PaletteStep[], step: number) {
  return palette.find((s) => s.step === step)?.hex ?? "#000";
}

export function ComponentPreview({ palette, shadows }: ComponentPreviewProps) {
  if (!palette || !shadows) {
    return (
      <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  const brand50 = get(palette, 50);
  const brand100 = get(palette, 100);
  const brand200 = get(palette, 200);
  const brand500 = get(palette, 500);
  const brand600 = get(palette, 600);
  const brand700 = get(palette, 700);
  const brand900 = get(palette, 900);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Buttons card */}
      <div
        className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
        style={{ boxShadow: shadows.sm }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Buttons
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: brand500, color: "#fff" }}
          >
            Get started
          </button>
          <button
            className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{
              borderColor: brand500,
              color: brand600,
              backgroundColor: brand50,
            }}
          >
            Learn more
          </button>
          <button
            className="rounded-md px-4 py-2 text-sm font-medium hover:opacity-70"
            style={{ color: brand700 }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Badges & states card */}
      <div
        className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
        style={{ boxShadow: shadows.sm }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Badges
        </p>
        <div className="flex flex-wrap gap-2">
          {["Active", "Beta", "New", "Pro"].map((label, i) => {
            const opacities = [1, 0.85, 0.7, 0.55];
            return (
              <span
                key={label}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: brand100,
                  color: brand700,
                  opacity: opacities[i],
                }}
              >
                {label}
              </span>
            );
          })}
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: brand600, color: "#fff" }}
          >
            Primary
          </span>
          <span
            className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
            style={{ borderColor: brand200, color: brand700 }}
          >
            Outline
          </span>
        </div>
      </div>

      {/* Input card */}
      <div
        className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
        style={{ boxShadow: shadows.sm }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Form input
        </p>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Email address</label>
            <input
              readOnly
              value="hello@example.com"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none"
              style={{ borderColor: brand500, boxShadow: `0 0 0 3px ${brand500}33` }}
            />
          </div>
          <button
            className="w-full rounded-md py-2 text-sm font-medium text-white"
            style={{ backgroundColor: brand500 }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Alert / card */}
      <div
        className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
        style={{ boxShadow: shadows.sm }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Alert
        </p>
        <div
          className="rounded-lg border p-4"
          style={{ borderColor: brand200, backgroundColor: brand50 }}
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full"
              style={{ backgroundColor: brand500 }}
            />
            <div>
              <p className="text-sm font-medium" style={{ color: brand900 }}>
                Tokens generated
              </p>
              <p className="mt-0.5 text-xs" style={{ color: brand700 }}>
                Your design system is ready to use. Export CSS variables or Tailwind config below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
