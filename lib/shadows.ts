"use client";

import { converter, parse } from "culori";

const toOklch = converter("oklch");

export type ShadowSet = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

export function generateShadows(brandHex: string): ShadowSet {
  const parsed = parse(brandHex);
  const oklch = parsed ? toOklch(parsed) : null;
  const h = oklch?.h ?? 220;

  // Use brand hue for tinted shadows — premium, coherent feel
  const s = (alpha: number, blur: number, spread = 0, y = blur / 2) =>
    `0 ${y}px ${blur}px ${spread}px oklch(0.12 0.04 ${h.toFixed(0)} / ${alpha})`;

  return {
    sm: s(0.07, 2, 0, 1),
    md: `${s(0.08, 6, -1, 2)}, ${s(0.06, 3, -2, 1)}`,
    lg: `${s(0.1, 15, -3, 4)}, ${s(0.06, 6, -4, 2)}`,
    xl: `${s(0.12, 25, -5, 8)}, ${s(0.08, 10, -6, 3)}`,
    "2xl": s(0.2, 50, -12, 12),
  };
}
