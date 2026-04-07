"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SaveDialogProps {
  brandColor: string;
  baseFontSize: number;
  typeRatio: number;
  baseSpacingUnit: number;
  disabled?: boolean;
}

export function SaveDialog({
  brandColor,
  baseFontSize,
  typeRatio,
  baseSpacingUnit,
  disabled,
}: SaveDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const save = useMutation(api.tokenSets.save);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const result = await save({ name: name.trim(), brandColor, baseFontSize, typeRatio, baseSpacingUnit });
      setSlug(result.slug);
    } finally {
      setSaving(false);
    }
  };

  const shareUrl =
    typeof window !== "undefined" && slug ? `${window.location.origin}/t/${slug}` : null;

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setName("");
      setSlug(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button disabled={disabled} className="font-mono text-xs" />}
      >
        Save &amp; share
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm font-medium">Save token set</DialogTitle>
        </DialogHeader>
        {slug ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Saved! Share this link:</p>
            <div className="flex gap-2">
              <Input value={shareUrl ?? ""} readOnly className="font-mono text-xs" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(shareUrl ?? "")}
                className="shrink-0 font-mono text-xs"
              >
                Copy
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token-name" className="font-mono text-xs">
                Name
              </Label>
              <Input
                id="token-name"
                placeholder="e.g. Acme Brand"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                className="font-mono text-sm"
                autoFocus
              />
            </div>
            <Button
              onClick={handleSave}
              disabled={!name.trim() || saving}
              className="w-full font-mono text-xs"
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
