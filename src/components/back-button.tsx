"use client";

import { IconArrowLeft } from "@tabler/icons-react";

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
    >
      <IconArrowLeft className="size-5" />
      Go Back
    </button>
  );
}
