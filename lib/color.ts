"use client";

import { converter, formatHex, parse, wcagContrast } from "culori";

const toOklch = converter("oklch");

const PALETTE_STEPS = [
  { step: 50, l: 0.971 },
  { step: 100, l: 0.943 },
  { step: 200, l: 0.882 },
  { step: 300, l: 0.792 },
  { step: 400, l: 0.694 },
  { step: 500, l: 0.582 },
  { step: 600, l: 0.481 },
  { step: 700, l: 0.39 },
  { step: 800, l: 0.308 },
  { step: 900, l: 0.239 },
  { step: 950, l: 0.175 },
] as const;

export type PaletteStep = {
  step: number;
  hex: string;
  wcagOnWhite: number;
  wcagOnDark: number;
};

export function generatePalette(hex: string): PaletteStep[] | null {
  const parsed = parse(hex);
  if (!parsed) return null;

  const oklch = toOklch(parsed);
  if (!oklch) return null;

  const baseC = oklch.c ?? 0;
  const baseH = oklch.h ?? 0;

  return PALETTE_STEPS.map(({ step, l }) => {
    // Scale chroma: peak near mid-tones, reduce at extremes
    const midL = 0.55;
    const chromaScale = 1 - Math.abs(l - midL) * 0.6;
    const c = Math.max(0, baseC * chromaScale);

    const swatchHex = formatHex({ mode: "oklch", l, c, h: baseH }) ?? "#000000";

    const onWhite = wcagContrast(swatchHex, "#ffffff");
    const onDark = wcagContrast(swatchHex, "#0a0a0a");

    return { step, hex: swatchHex, wcagOnWhite: onWhite, wcagOnDark: onDark };
  });
}

export function isValidHex(hex: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
}

export function wcagLabel(ratio: number): "AAA" | "AA" | "AA Large" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}
