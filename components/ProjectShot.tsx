"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Browser mockup frame with a real site screenshot.
 * Pulse skeleton while loading, subtle zoom on hover, live link overlay.
 */
export function ProjectShot({
  image,
  alt,
  urlLabel,
  href,
  conceptHref,
}: {
  image?: string;
  alt: string;
  urlLabel: string;
  href: string;
  conceptHref?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showFallback = !image || failed;

  return (
    <motion.a
      href={conceptHref ?? href}
      target={conceptHref ? undefined : "_blank"}
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="group block overflow-hidden rounded-lg border border-line bg-card shadow-sm transition-shadow duration-150 hover:shadow-md"
      aria-label={`${alt}: open ${conceptHref ? "interactive demo" : "live site"}`}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-dashed" />
          <span className="h-2.5 w-2.5 rounded-full bg-dashed" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/50" />
        </span>
        <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-paper px-3 py-1">
          <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-faint" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="2.5" y="5.5" width="7" height="5" rx="1.5" />
            <path d="M4 5.5 V4 a2 2 0 0 1 4 0 v1.5" />
          </svg>
          <span className="truncate font-mono text-[11px] text-muted">{urlLabel}</span>
        </span>
      </div>

      {/* viewport */}
      <div className="relative aspect-video overflow-hidden bg-raised">
        {!loaded && !showFallback && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-raised via-card to-raised" aria-hidden="true" />
        )}
        {showFallback ? (
          <ConceptPreview />
        ) : (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              "object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.03]",
              loaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}

        {/* hover overlay */}
        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ink/45 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <span className="inline-flex translate-y-1 items-center gap-2 rounded-md bg-paper px-4 py-2.5 text-sm font-semibold text-ink shadow-md transition-transform duration-150 group-hover:translate-y-0">
            {conceptHref ? "Open interactive demo" : "Open live site"}
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 3 H13 V10 M13 3 L7 9" />
            </svg>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/** Animated dashboard wireframe used until the concept demo ships its own capture. */
function ConceptPreview() {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" role="img" aria-label="Pulseboard concept dashboard wireframe">
      <rect x="24" y="24" width="592" height="312" rx="10" fill="#FAF8F4" stroke="#E3DDCF" strokeWidth="1.5" />
      <rect x="24" y="24" width="592" height="52" rx="10" fill="#F2EFE8" stroke="#E3DDCF" strokeWidth="1.5" />
      <rect x="48" y="42" width="120" height="14" rx="7" fill="#1D4A38" opacity="0.85" />
      <rect x="520" y="40" width="72" height="18" rx="9" fill="#B45309" opacity="0.85" />
      {[48, 236, 424].map((x) => (
        <g key={x}>
          <rect x={x} y="100" width="164" height="76" rx="8" fill="#F5F2EB" stroke="#E3DDCF" strokeWidth="1.5" />
          <rect x={x + 16} y="116" width="70" height="10" rx="5" fill="#D8D1BF" />
          <rect x={x + 16} y="136" width="100" height="16" rx="4" fill="#1D4A38" opacity="0.8" />
        </g>
      ))}
      <rect x="48" y="196" width="352" height="116" rx="8" fill="#F5F2EB" stroke="#E3DDCF" strokeWidth="1.5" />
      <motion.path
        d="M72 280 L120 240 L168 258 L216 210 L264 228 L312 190 L360 205"
        fill="none" stroke="#1D4A38" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <rect x="424" y="196" width="164" height="116" rx="8" fill="#1D4A38" stroke="#1D4A38" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={448 + i * 36} width="22" rx="4" fill="#FAF8F4" opacity="0.9"
          initial={{ y: 296, height: 0 }}
          whileInView={{ y: 296 - [40, 72, 54, 88][i], height: [40, 72, 54, 88][i] }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}
