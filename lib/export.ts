import type { PaletteStep } from "./color";
import type { ShadowSet } from "./shadows";
import type { SpacingStep } from "./spacing";
import type { TypeStep } from "./typography";

export type TokenSet = {
  brandColor: string;
  palette: PaletteStep[];
  typeScale: TypeStep[];
  spacingScale: SpacingStep[];
  shadows: ShadowSet;
};

export function generateCSSVars(tokens: TokenSet): string {
  const lines: string[] = [":root {"];

  for (const swatch of tokens.palette) {
    lines.push(`  --color-brand-${swatch.step}: ${swatch.hex};`);
  }

  lines.push("");
  for (const step of tokens.typeScale) {
    lines.push(`  --font-size-${step.name}: ${step.sizeRem}rem;`);
    lines.push(`  --line-height-${step.name}: ${step.lineHeight};`);
  }

  lines.push("");
  for (const step of tokens.spacingScale) {
    lines.push(`  --space-${step.name}: ${step.value === 0 ? "0px" : `${step.value / 16}rem`};`);
  }

  lines.push("");
  for (const [key, value] of Object.entries(tokens.shadows)) {
    lines.push(`  --shadow-${key}: ${value};`);
  }

  lines.push("}");
  return lines.join("\n");
}

export function generateTailwindConfig(tokens: TokenSet): string {
  const colors: Record<string, string> = {};
  for (const swatch of tokens.palette) {
    colors[swatch.step] = swatch.hex;
  }

  const fontSize: Record<string, [string, { lineHeight: string }]> = {};
  for (const step of tokens.typeScale) {
    fontSize[step.name] = [`${step.sizeRem}rem`, { lineHeight: String(step.lineHeight) }];
  }

  const spacing: Record<string, string> = {};
  for (const step of tokens.spacingScale) {
    spacing[step.name] = step.value === 0 ? "0px" : `${step.value / 16}rem`;
  }

  const boxShadow: Record<string, string> = {};
  for (const [key, value] of Object.entries(tokens.shadows)) {
    boxShadow[key] = value;
  }

  const config = {
    theme: {
      extend: {
        colors: { brand: colors },
        fontSize,
        spacing,
        boxShadow,
      },
    },
  };

  return `import type { Config } from "tailwindcss";\n\nexport default {\n  theme: {\n    extend: ${JSON.stringify(config.theme.extend, null, 6).replace(/^/gm, "  ")},\n  },\n} satisfies Config;`;
}

export function generateJSON(tokens: TokenSet): string {
  const json: Record<string, unknown> = {
    color: {
      brand: Object.fromEntries(
        tokens.palette.map((s) => [
          s.step,
          {
            value: s.hex,
            wcagOnWhite: Math.round(s.wcagOnWhite * 100) / 100,
            wcagOnDark: Math.round(s.wcagOnDark * 100) / 100,
          },
        ]),
      ),
    },
    typography: Object.fromEntries(
      tokens.typeScale.map((s) => [
        s.name,
        { value: `${s.sizeRem}rem`, lineHeight: s.lineHeight, px: s.sizePx },
      ]),
    ),
    spacing: Object.fromEntries(
      tokens.spacingScale.map((s) => [s.name, { value: `${s.value}px` }]),
    ),
    shadow: Object.fromEntries(
      Object.entries(tokens.shadows).map(([k, v]) => [k, { value: v }]),
    ),
  };
  return JSON.stringify(json, null, 2);
}
