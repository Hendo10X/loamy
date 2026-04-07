export type TypeStep = {
  name: string;
  sizePx: number;
  sizeRem: number;
  lineHeight: number;
};

const SCALE_NAMES = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"] as const;
// base is at index 2, positions relative to base:  -2, -1, 0, +1, +2, +3, +4, +5
const POSITIONS = [-2, -1, 0, 1, 2, 3, 4, 5];

export function generateTypeScale(baseFontSize: number, ratio: number): TypeStep[] {
  return SCALE_NAMES.map((name, i) => {
    const sizePx = baseFontSize * Math.pow(ratio, POSITIONS[i]);
    const rounded = Math.round(sizePx * 100) / 100;
    const sizeRem = Math.round((rounded / 16) * 1000) / 1000;
    // Tighter line-heights for large text
    const lineHeight = rounded <= 14 ? 1.6 : rounded <= 18 ? 1.5 : rounded <= 24 ? 1.4 : rounded <= 36 ? 1.3 : 1.1;
    return { name, sizePx: rounded, sizeRem, lineHeight };
  });
}

export const TYPE_RATIO_OPTIONS = [
  { label: "Minor Second", shortLabel: "1.125", value: 1.125 },
  { label: "Major Second", shortLabel: "1.200", value: 1.2 },
  { label: "Minor Third", shortLabel: "1.250", value: 1.25 },
  { label: "Major Third", shortLabel: "1.333", value: 1.333 },
  { label: "Perfect Fourth", shortLabel: "1.500", value: 1.5 },
];

export const FONT_SIZE_OPTIONS = [
  { label: "14px", value: 14 },
  { label: "16px", value: 16 },
  { label: "18px", value: 18 },
];
