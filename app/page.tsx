"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ColorPalette } from "@/components/token-studio/color-palette"
import { TypographyScale } from "@/components/token-studio/typography-scale"
import { SpacingScale } from "@/components/token-studio/spacing-scale"
import { ShadowPresets } from "@/components/token-studio/shadow-presets"
import { ComponentPreview } from "@/components/token-studio/component-preview"
import { ExportPanel } from "@/components/token-studio/export-panel"
import { SaveDialog } from "@/components/token-studio/save-dialog"
import { generatePalette, isValidHex } from "@/lib/color"
import {
  FONT_SIZE_OPTIONS,
  generateTypeScale,
  TYPE_RATIO_OPTIONS,
} from "@/lib/typography"
import { generateSpacingScale, SPACING_UNIT_OPTIONS } from "@/lib/spacing"
import { generateShadows } from "@/lib/shadows"
import type { TokenSet } from "@/lib/export"
import type { PaletteStep } from "@/lib/color"
import type { TypeStep } from "@/lib/typography"
import type { SpacingStep } from "@/lib/spacing"
import type { ShadowSet } from "@/lib/shadows"

function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-6 flex items-baseline gap-3 sm:gap-4">
      <span className="shrink-0 font-mono text-xs text-muted-foreground">{step}</span>
      <div className="min-w-0">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <p className="mt-0.5 font-mono text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: number }[]
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors ${
            value === opt.value
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function TokenStudioInner() {
  const searchParams = useSearchParams()

  const [hex, setHex] = useState(() => searchParams.get("color") ?? "#6366f1")
  const [inputText, setInputText] = useState(
    () => searchParams.get("color") ?? "#6366f1"
  )
  const [baseFontSize, setBaseFontSize] = useState(() =>
    Number(searchParams.get("fs") ?? 16)
  )
  const [typeRatio, setTypeRatio] = useState(() =>
    Number(searchParams.get("ratio") ?? 1.25)
  )
  const [baseSpacingUnit, setBaseSpacingUnit] = useState(() =>
    Number(searchParams.get("unit") ?? 4)
  )

  const isValid = isValidHex(hex)

  const palette: PaletteStep[] | null = isValid ? generatePalette(hex) : null
  const typeScale: TypeStep[] | null = isValid
    ? generateTypeScale(baseFontSize, typeRatio)
    : null
  const spacingScale: SpacingStep[] | null = isValid
    ? generateSpacingScale(baseSpacingUnit)
    : null
  const shadows: ShadowSet | null = isValid ? generateShadows(hex) : null

  const tokens: TokenSet | null =
    palette && typeScale && spacingScale && shadows
      ? { brandColor: hex, palette, typeScale, spacingScale, shadows }
      : null

  const handleTextInput = (val: string) => {
    setInputText(val)
    const normalized = val.startsWith("#") ? val : `#${val}`
    if (isValidHex(normalized)) setHex(normalized)
  }

  const handleColorPicker = (val: string) => {
    setHex(val)
    setInputText(val)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h1 className="text-sm font-medium tracking-tight text-foreground">Loamy</h1>
            <p className="hidden font-mono text-xs text-muted-foreground sm:block">
              One color. Everything else derived.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ExportPanel tokens={tokens} />
            <SaveDialog
              brandColor={hex}
              baseFontSize={baseFontSize}
              typeRatio={typeRatio}
              baseSpacingUnit={baseSpacingUnit}
              disabled={!isValid}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-12 px-4 py-8 sm:space-y-16 sm:px-6 sm:py-10">
        {/* Input section */}
        <section>
          <div className="flex flex-wrap items-end gap-5 lg:gap-8">
            {/* Brand Color */}
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">Brand color</Label>
              <div className="flex items-center gap-2">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-border">
                  <input
                    type="color"
                    value={isValidHex(hex) ? hex : "#6366f1"}
                    onChange={(e) => handleColorPicker(e.target.value)}
                    className="absolute -inset-1 h-12 w-12 cursor-pointer border-0 bg-transparent p-0 opacity-0"
                  />
                  <div
                    className="h-full w-full rounded-md transition-colors duration-150"
                    style={{ backgroundColor: isValidHex(hex) ? hex : "#6366f1" }}
                  />
                </div>
                <Input
                  value={inputText}
                  onChange={(e) => handleTextInput(e.target.value)}
                  placeholder="#6366f1"
                  className="w-32 font-mono text-sm"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Base font size */}
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">Base font size</Label>
              <SegmentedControl
                options={FONT_SIZE_OPTIONS}
                value={baseFontSize}
                onChange={setBaseFontSize}
              />
            </div>

            {/* Type ratio */}
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">Type ratio</Label>
              <Select
                value={String(typeRatio)}
                onValueChange={(v) => setTypeRatio(Number(v))}
              >
                <SelectTrigger className="h-auto w-52 px-3 py-1.5 font-mono text-xs">
                  <SelectValue>
                    {TYPE_RATIO_OPTIONS.find((o) => String(o.value) === String(typeRatio))?.label ?? typeRatio}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TYPE_RATIO_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={String(opt.value)} className="font-mono text-xs">
                      {opt.label} ({opt.shortLabel})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Spacing unit */}
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">Spacing unit</Label>
              <SegmentedControl
                options={SPACING_UNIT_OPTIONS.map((o) => ({ label: `${o.value}px`, value: o.value }))}
                value={baseSpacingUnit}
                onChange={setBaseSpacingUnit}
              />
            </div>
          </div>

          {!isValid && (
            <p className="mt-5 font-mono text-xs text-muted-foreground">
              Enter a valid hex color above to generate your token system.
            </p>
          )}
        </section>

        <Separator />

        {/* Color System */}
        <section>
          <SectionHeader
            step="01"
            title="Color System"
            subtitle="OKLCH perceptual palette — 11 steps with WCAG contrast ratings"
          />
          <ColorPalette palette={palette} />
        </section>

        <Separator />

        {/* Typography */}
        <section>
          <SectionHeader
            step="02"
            title="Typography Scale"
            subtitle={`${baseFontSize}px base · ${TYPE_RATIO_OPTIONS.find((o) => o.value === typeRatio)?.shortLabel ?? typeRatio} ratio`}
          />
          <TypographyScale scale={typeScale} brandColor={isValid ? hex : undefined} />
        </section>

        <Separator />

        {/* Spacing */}
        <section>
          <SectionHeader
            step="03"
            title="Spacing Scale"
            subtitle={`${baseSpacingUnit}px base unit · visual ruler`}
          />
          <SpacingScale scale={spacingScale} brandColor={isValid ? hex : undefined} />
        </section>

        <Separator />

        {/* Shadows */}
        <section>
          <SectionHeader
            step="04"
            title="Shadow Presets"
            subtitle="Brand-tinted elevation shadows"
          />
          <ShadowPresets shadows={shadows} />
        </section>

        <Separator />

        {/* Component Preview — live UI preview using brand tokens */}
        <section>
          <SectionHeader
            step="05"
            title="Component Preview"
            subtitle="Live UI components rendered with your brand tokens"
          />
          <ComponentPreview palette={palette} shadows={shadows} />
        </section>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <TokenStudioInner />
    </Suspense>
  )
}
