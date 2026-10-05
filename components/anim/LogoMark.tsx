"use client";

import { motion } from "framer-motion";

/** Animated monogram: code brackets drawing themselves inside a frame. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 0.7, delay: 0.15 * i, ease: "easeOut" }, opacity: { duration: 0.2, delay: 0.15 * i } },
    }),
  } as const;

  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <motion.rect
        x="3" y="3" width="34" height="34" rx="8"
        stroke="#2B4BFF" strokeWidth="2.5"
        variants={draw} initial="hidden" animate="show" custom={0}
      />
      <motion.path
        d="M15 14 L10 20 L15 26"
        stroke="#2B4BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        variants={draw} initial="hidden" animate="show" custom={1}
      />
      <motion.path
        d="M25 14 L30 20 L25 26"
        stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        variants={draw} initial="hidden" animate="show" custom={2}
      />
    </svg>
  );
}
