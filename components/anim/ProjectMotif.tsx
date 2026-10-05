"use client";

import { motion } from "framer-motion";

/**
 * Per-project animated SVG motif shown in the preview panel.
 * Line-art that draws itself on scroll into view, with one looping accent.
 */
export function ProjectMotif({
  motif,
  className = "",
}: {
  motif: "gem" | "container" | "pulse";
  className?: string;
}) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (d: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, delay: d, ease: "easeOut" as const },
    }),
  };

  if (motif === "gem") {
    return (
      <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true">
        <motion.path d="M100 18 L158 62 L100 142 L42 62 Z" stroke="#1D4A38" strokeWidth="2.5" strokeLinejoin="round"
          variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.1} />
        <motion.path d="M42 62 H158 M100 18 L74 62 L100 142 M100 18 L126 62 L100 142 M74 62 L62 88 M126 62 L138 88" stroke="#B45309" strokeWidth="1.5"
          variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.5} />
        <motion.circle cx="100" cy="80" r="5" fill="#B45309"
          initial={{ opacity: 0 }} whileInView={{ opacity: [0, 1, 0.25, 1], scale: [0.8, 1.15, 1] }}
          viewport={{ once: true }} transition={{ duration: 1.6, delay: 1.2 }} />
      </svg>
    );
  }

  if (motif === "container") {
    return (
      <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true">
        <motion.path d="M30 60 L100 30 L170 60 L170 120 L100 150 L30 120 Z" stroke="#1D4A38" strokeWidth="2.5" strokeLinejoin="round"
          variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.1} />
        <motion.path d="M30 60 L100 90 L170 60 M100 90 L100 150 M52 72 L52 112 M76 61 L76 101 M124 61 L124 101 M148 72 L148 112" stroke="#B45309" strokeWidth="1.5"
          variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.5} />
        <motion.path d="M118 118 l14 -7 M132 111 l-4 8 M132 111 l8 2" stroke="#1D4A38" strokeWidth="2" strokeLinecap="round"
          initial={{ opacity: 0, x: 0 }} whileInView={{ opacity: 1, x: [0, 6, 0] }}
          viewport={{ once: true }} transition={{ duration: 1.8, delay: 1.2, repeat: Infinity, ease: "easeInOut" }} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true">
      <motion.rect x="20" y="20" width="160" height="120" rx="10" stroke="#D8D1BF" strokeWidth="1.5" strokeDasharray="5 5"
        variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.1} />
      <motion.path d="M35 85 H75 L88 50 L104 115 L118 68 L128 85 H165" stroke="#1D4A38" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.4} />
      <motion.circle cx="104" cy="115" r="5" fill="#B45309"
        animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  );
}
