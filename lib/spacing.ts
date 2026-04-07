export type SpacingStep = {
  name: string;
  value: number;
  cssName: string;
};

const STEPS = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44,
  48, 56, 64,
];

export function generateSpacingScale(baseUnit: number): SpacingStep[] {
  return STEPS.map((step) => ({
    name: String(step),
    value: step * baseUnit,
    cssName: `space-${step}`,
  }));
}

export const SPACING_UNIT_OPTIONS = [
  { label: "4px (Tailwind default)", value: 4 },
  { label: "8px (8-point grid)", value: 8 },
];
