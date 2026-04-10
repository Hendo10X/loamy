"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ColorPalette } from "@/components/token-studio/color-palette";
import { TypographyScale } from "@/components/token-studio/typography-scale";
import { SpacingScale } from "@/components/token-studio/spacing-scale";
import { ShadowPresets } from "@/components/token-studio/shadow-presets";
import { ExportPanel } from "@/components/token-studio/export-panel";
import { generatePalette } from "@/lib/color";
import { generateTypeScale, TYPE_RATIO_OPTIONS } from "@/lib/typography";
import { generateSpacingScale } from "@/lib/spacing";
import { generateShadows } from "@/lib/shadows";
import type { TokenSet } from "@/lib/export";

function SectionHeader({ step, title, subtitle }: { step: string; title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-mono text-xs text-muted-foreground">{step}</span>
      <div>
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <p className="mt-0.5 font-mono text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export default function SharedTokenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const tokenSet = useQuery(api.tokenSets.getBySlug, { slug });

  if (tokenSet === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-xs text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (tokenSet === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="font-mono text-sm text-muted-foreground">Token set not found.</p>
        <Button variant="outline" onClick={() => router.push("/studio")} className="font-mono text-xs">
          ← Back to studio
        </Button>
      </div>
    );
  }

  const { brandColor, baseFontSize, typeRatio, baseSpacingUnit, name } = tokenSet;
  // Satisfy TypeScript — these are always present in a saved token set

  const palette = generatePalette(brandColor);
  const typeScale = generateTypeScale(baseFontSize, typeRatio);
  const spacingScale = generateSpacingScale(baseSpacingUnit);
  const shadows = generateShadows(brandColor);

  const tokens: TokenSet | null =
    palette && typeScale && spacingScale && shadows
      ? { brandColor, palette, typeScale, spacingScale, shadows }
      : null;

  const remixParams = new URLSearchParams({
    color: brandColor,
    fs: String(baseFontSize),
    ratio: String(typeRatio),
    unit: String(baseSpacingUnit),
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-sm font-medium tracking-tight text-foreground">{name}</h1>
            <div className="mt-0.5 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: brandColor }}
              />
              <p className="font-mono text-xs text-muted-foreground">{brandColor}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ExportPanel tokens={tokens} />
            <Button
              onClick={() => router.push(`/studio?${remixParams.toString()}`)}
              className="font-mono text-xs"
            >
              Remix in studio
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 space-y-16">
        <section>
          <SectionHeader
            step="01"
            title="Color System"
            subtitle="OKLCH perceptual palette — 11 steps with WCAG contrast ratings"
          />
          <ColorPalette palette={palette} />
        </section>

        <Separator />

        <section>
          <SectionHeader
            step="02"
            title="Typography Scale"
            subtitle={`${baseFontSize}px base · ${TYPE_RATIO_OPTIONS.find((o) => o.value === typeRatio)?.label ?? typeRatio} ratio`}
          />
          <TypographyScale scale={typeScale} brandColor={brandColor} />
        </section>

        <Separator />

        <section>
          <SectionHeader
            step="03"
            title="Spacing Scale"
            subtitle={`${baseSpacingUnit}px base unit · visual ruler`}
          />
          <SpacingScale scale={spacingScale} brandColor={brandColor} />
        </section>

        <Separator />

        <section>
          <SectionHeader
            step="04"
            title="Shadow Presets"
            subtitle="Brand-tinted elevation shadows"
          />
          <ShadowPresets shadows={shadows} />
        </section>
      </main>
    </div>
  );
}
