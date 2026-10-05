"use client";

import { cn } from "@/lib/utils";

/** Live status dot: pine core with an expanding ring, pure SVG + CSS. */
export function StatusPulse({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("h-3 w-3", className)} aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="#1D4A38" strokeWidth="1.5" opacity="0.35" className="animate-pulse-dot" style={{ transformOrigin: "8px 8px" }} />
      <circle cx="8" cy="8" r="3.2" fill="#1D4A38" />
    </svg>
  );
}
