declare module "culori" {
  export type Color = { mode: string; [key: string]: unknown };
  export type OklchColor = { mode: "oklch"; l: number; c: number; h: number; alpha?: number };
  export type RgbColor = { mode: "rgb"; r: number; g: number; b: number; alpha?: number };

  export function parse(color: string): Color | undefined;
  export function formatHex(color: Color | string): string | undefined;
  export function wcagContrast(color1: Color | string, color2: Color | string): number;
  export function wcagLuminance(color: Color | string): number;
  export function converter(mode: "oklch"): (color: Color | string) => OklchColor | undefined;
  export function converter(mode: "rgb"): (color: Color | string) => RgbColor | undefined;
  export function converter(mode: string): (color: Color | string) => Color | undefined;
}
