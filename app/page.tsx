import Link from "next/link"
import { Button } from "@/components/ui/button"

const FEATURES = [
  {
    step: "01",
    title: "Color System",
    desc: "11-step OKLCH palette with WCAG contrast badges on every swatch.",
  },
  {
    step: "02",
    title: "Typography Scale",
    desc: "Modular scale from any base size and ratio — live text specimens.",
  },
  {
    step: "03",
    title: "Spacing Scale",
    desc: "Visual ruler grid built from a 4px or 8px base unit.",
  },
  {
    step: "04",
    title: "Shadow Presets",
    desc: "Five elevation levels tinted with your brand hue.",
  },
  {
    step: "05",
    title: "Component Preview",
    desc: "Buttons, badges, inputs, and alerts rendered live with your tokens.",
  },
  {
    step: "06",
    title: "Gradient Presets",
    desc: "Six ready-to-copy CSS gradients derived from your palette.",
  },
]

const EXPORTS = ["CSS Variables", "Tailwind Config", "JSON"]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <span className="font-mono text-sm font-medium">Loamy</span>
        <div className="flex items-center gap-4">
          <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            d
          </kbd>
          <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
            toggle dark
          </span>
          <Link href="/studio">
            <Button className="font-mono text-xs">Open studio →</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 sm:pt-24">
        <p className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Design Token Studio
        </p>
        <h1 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          One color.{" "}
          <span className="text-muted-foreground">Everything else derived.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Enter a brand color and get a complete design system — palette, type
          scale, spacing, shadows, gradients — exported as CSS variables,
          Tailwind config, or JSON.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/studio">
            <Button className="font-mono text-sm">Get started</Button>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span>Export as</span>
            {EXPORTS.map((e, i) => (
              <span key={e}>
                {e}
                {i < EXPORTS.length - 1 && (
                  <span className="ml-2 text-border">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <p className="mb-10 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          What gets generated
        </p>
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ step, title, desc }) => (
            <div
              key={step}
              className="flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-muted/40"
            >
              <span className="font-mono text-xs text-muted-foreground">{step}</span>
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
              <p className="font-mono text-xs leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-border" />
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-medium text-foreground">
              Ready to build your design system?
            </h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              No account needed. Save and share with a link.
            </p>
          </div>
          <Link href="/studio" className="shrink-0">
            <Button className="font-mono text-sm">Open studio →</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border" />
      <footer className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <span className="font-mono text-xs text-muted-foreground">Loamy</span>
        <span className="font-mono text-xs text-muted-foreground">
          Press{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            d
          </kbd>{" "}
          to toggle dark mode
        </span>
      </footer>
    </div>
  )
}
