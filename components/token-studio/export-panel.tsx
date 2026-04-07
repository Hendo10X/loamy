"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateCSSVars, generateTailwindConfig, generateJSON, type TokenSet } from "@/lib/export";

interface ExportPanelProps {
  tokens: TokenSet | null;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline" size="sm" onClick={copy} className="shrink-0 font-mono text-xs">
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative mt-3 min-w-0 overflow-hidden">
      <div className="absolute right-3 top-3 z-10">
        <CopyButton text={code} />
      </div>
      <pre className="max-h-[400px] w-full overflow-y-auto whitespace-pre-wrap break-all rounded-lg border border-border bg-muted/50 p-4 pr-20 font-mono text-xs leading-relaxed text-foreground [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <code className="block min-w-0">{code}</code>
      </pre>
    </div>
  );
}

export function ExportPanel({ tokens }: ExportPanelProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button disabled={!tokens} variant="outline" className="font-mono text-xs" />
        }
      >
        Export tokens
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm font-medium">Export Design Tokens</DialogTitle>
        </DialogHeader>
        {tokens && (
          <Tabs defaultValue="css">
            <TabsList className="w-full">
              <TabsTrigger value="css" className="flex-1 font-mono text-xs">
                CSS Variables
              </TabsTrigger>
              <TabsTrigger value="tailwind" className="flex-1 font-mono text-xs">
                Tailwind Config
              </TabsTrigger>
              <TabsTrigger value="json" className="flex-1 font-mono text-xs">
                JSON
              </TabsTrigger>
            </TabsList>
            <TabsContent value="css">
              <CodeBlock code={generateCSSVars(tokens)} />
            </TabsContent>
            <TabsContent value="tailwind">
              <CodeBlock code={generateTailwindConfig(tokens)} />
            </TabsContent>
            <TabsContent value="json">
              <CodeBlock code={generateJSON(tokens)} />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
