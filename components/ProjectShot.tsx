"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ShotImage({
  src,
  alt,
  sizes,
  className,
  onError,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  onError?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-raised via-line/60 to-raised"
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.03]",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={onError}
      />
    </>
  );
}

/**
 * Device mockup: desktop browser frame + overlapping phone frame,
 * both showing real captures. Skeleton shimmer while loading,
 * graceful fallback if a capture fails.
 */
export function ProjectShot({
  image,
  mobileImage,
  alt,
  urlLabel,
  href,
  conceptHref,
}: {
  image?: string;
  mobileImage?: string;
  alt: string;
  urlLabel: string;
  href: string;
  conceptHref?: string;
}) {
  const [desktopFailed, setDesktopFailed] = useState(false);
  const [mobileFailed, setMobileFailed] = useState(false);
  const showDesktopFallback = !image || desktopFailed;
  const showPhone = !!mobileImage && !mobileFailed;
  const link = conceptHref ?? href;

  return (
    <motion.a
      href={link}
      target={conceptHref ? undefined : "_blank"}
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="group block"
      aria-label={`${alt}: open ${conceptHref ? "interactive demo" : "live site"}`}
    >
      <div className="relative">
        {/* desktop browser frame */}
        <div className="overflow-hidden rounded-lg border border-line bg-card shadow-sm transition-shadow duration-150 group-hover:shadow-md">
          <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-dashed" />
              <span className="h-2.5 w-2.5 rounded-full bg-dashed" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand/50" />
            </span>
            <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-paper px-3 py-1">
              <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-faint" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2.5" y="5.5" width="7" height="5" rx="1.5" />
                <path d="M4 5.5 V4 a2 2 0 0 1 4 0 v1.5" />
              </svg>
              <span className="truncate font-mono text-[11px] text-muted">{urlLabel}</span>
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-raised">
            {showDesktopFallback ? (
              <ConceptPreview />
            ) : (
              <ShotImage
                src={image}
                alt={alt}
                sizes="(max-width: 1024px) 100vw, 55vw"
                onError={() => setDesktopFailed(true)}
              />
            )}
            <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ink/40 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <span className="inline-flex translate-y-1 items-center gap-2 rounded-md bg-paper px-4 py-2.5 text-sm font-semibold text-ink shadow-md transition-transform duration-150 group-hover:translate-y-0">
                {conceptHref ? "Open interactive demo" : "Open live site"}
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3 H13 V10 M13 3 L7 9" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* phone frame */}
        {showPhone && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="absolute -bottom-8 right-4 w-[24%] min-w-[110px] sm:right-8"
          >
            <div className="rounded-[1.6rem] border border-line bg-ink p-[7px] shadow-md transition-transform duration-150 group-hover:-translate-y-1">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1.15rem] bg-raised">
                <ShotImage
                  src={mobileImage}
                  alt={`${alt} on mobile`}
                  sizes="25vw"
                  onError={() => setMobileFailed(true)}
                />
                <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {/* spacer for the overlapping phone */}
      {showPhone && <div className="h-8" aria-hidden="true" />}
    </motion.a>
  );
}

/** Animated dashboard wireframe used if a capture is unavailable. */
function ConceptPreview() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" role="img" aria-label="Project preview wireframe">
      <rect x="24" y="24" width="592" height="352" rx="10" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1.5" />
      <rect x="24" y="24" width="592" height="52" rx="10" fill="#F7F7F9" stroke="#E4E4E7" strokeWidth="1.5" />
      <rect x="48" y="42" width="120" height="14" rx="7" fill="#2B4BFF" opacity="0.85" />
      <rect x="520" y="40" width="72" height="18" rx="9" fill="#0284C7" opacity="0.85" />
      {[48, 236, 424].map((x) => (
        <g key={x}>
          <rect x={x} y="100" width="164" height="76" rx="8" fill="#F7F7F9" stroke="#E4E4E7" strokeWidth="1.5" />
          <rect x={x + 16} y="116" width="70" height="10" rx="5" fill="#D4D4D8" />
          <rect x={x + 16} y="136" width="100" height="16" rx="4" fill="#2B4BFF" opacity="0.8" />
        </g>
      ))}
      <rect x="48" y="196" width="352" height="156" rx="8" fill="#F7F7F9" stroke="#E4E4E7" strokeWidth="1.5" />
      <motion.path
        d="M72 320 L120 280 L168 298 L216 250 L264 268 L312 230 L360 245"
        fill="none" stroke="#2B4BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <rect x="424" y="196" width="164" height="156" rx="8" fill="#2B4BFF" stroke="#2B4BFF" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={448 + i * 36} width="22" rx="4" fill="#FFFFFF" opacity="0.9"
          initial={{ y: 336, height: 0 }}
          whileInView={{ y: 336 - [40, 72, 54, 88][i], height: [40, 72, 54, 88][i] }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}
