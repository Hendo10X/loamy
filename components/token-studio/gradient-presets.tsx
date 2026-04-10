"use client";

import { useState } from "react";
import { generateGradients } from "@/lib/gradients";
import type { PaletteStep } from "@/lib/color";

interface GradientPresetsProps {
  palette: PaletteStep[] | null;
}

function GradientCard({
  name,
  desc,
  css,
  textColor,
}: {
  name: string;
  desc: string;
  css: string;
  textColor: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={copy}
      className="group relative overflow-hidden rounded-xl transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
      style={{ background: css }}
    >
      {/* Card body */}
      <div className="flex h-28 flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold leading-none" style={{ color: textColor }}>
              {name}
            </p>
            <p
              className="mt-1 font-mono text-[10px] opacity-70"
              style={{ color: textColor }}
            >
              {desc}
            </p>
          </div>
          {/* Copy indicator */}
          <span
            className="rounded-md px-2 py-0.5 font-mono text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              backgroundColor: `${textColor}22`,
              color: textColor,
            }}
          >
            {copied ? "Copied!" : "Copy CSS"}
          </span>
        </div>

        {/* CSS preview */}
        <p
          className="truncate font-mono text-[9px] opacity-50"
          style={{ color: textColor }}
        >
          {css}
        </p>
      </div>
    </button>
  );
}

export function GradientPresets({ palette }: GradientPresetsProps) {
  if (!palette) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  const gradients = generateGradients(palette);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {gradients.map((g) => (
        <GradientCard key={g.name} {...g} />
      ))}
    </div>
  );
}
