import type { PaletteStep } from "./color";

export type GradientPreset = {
  name: string;
  desc: string;
  css: string;
  textColor: string;
};

function hex(palette: PaletteStep[], step: number) {
  return palette.find((s) => s.step === step)?.hex ?? "#000";
}

export function generateGradients(palette: PaletteStep[]): GradientPreset[] {
  return [
    {
      name: "Soft Wash",
      desc: "50 → 200",
      css: `linear-gradient(135deg, ${hex(palette, 50)} 0%, ${hex(palette, 200)} 100%)`,
      textColor: hex(palette, 700),
    },
    {
      name: "Brand",
      desc: "300 → 600",
      css: `linear-gradient(135deg, ${hex(palette, 300)} 0%, ${hex(palette, 600)} 100%)`,
      textColor: "#ffffff",
    },
    {
      name: "Vivid",
      desc: "400 → 700",
      css: `linear-gradient(135deg, ${hex(palette, 400)} 0%, ${hex(palette, 700)} 100%)`,
      textColor: "#ffffff",
    },
    {
      name: "Deep",
      desc: "700 → 950",
      css: `linear-gradient(135deg, ${hex(palette, 700)} 0%, ${hex(palette, 950)} 100%)`,
      textColor: hex(palette, 100),
    },
    {
      name: "Aurora",
      desc: "50 → 400 → 700",
      css: `linear-gradient(135deg, ${hex(palette, 50)} 0%, ${hex(palette, 400)} 50%, ${hex(palette, 700)} 100%)`,
      textColor: "#ffffff",
    },
    {
      name: "Subtle",
      desc: "background → 100",
      css: `linear-gradient(180deg, transparent 0%, ${hex(palette, 100)} 100%)`,
      textColor: hex(palette, 700),
    },
  ];
}
