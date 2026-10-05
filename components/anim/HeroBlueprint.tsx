"use client";

import { motion } from "framer-motion";

/**
 * Animated system diagram: Client -> Next.js -> Database.
 * Mount-based animation (hero is above the fold): lines draw,
 * nodes rise, data packets travel the wires on a loop.
 */
export function HeroBlueprint({ className = "" }: { className?: string }) {
  const draw = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, delay, ease: "easeOut" as const },
    },
  });

  const rise = (delay: number) => ({
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay, ease: "easeOut" as const },
    },
  });

  const nodes = [
    { x: 20, title: "CLIENT", sub: "React UI", accent: false },
    { x: 176, title: "NEXT.JS", sub: "App Router", accent: true },
    { x: 332, title: "DATABASE", sub: "PostgreSQL", accent: false },
  ];

  const chips = ["SSR pages", "Route handlers", "Row-level auth"];

  return (
    <svg
      viewBox="0 0 480 300"
      fill="none"
      className={className}
      role="img"
      aria-label="Architecture diagram: client, Next.js server, and database connected by animated data flow"
    >
      <motion.rect
        x="8" y="8" width="464" height="284" rx="12"
        stroke="#D8D1BF" strokeWidth="1.5" strokeDasharray="6 6"
        variants={draw(0)} initial="hidden" animate="show"
      />

      {/* wires */}
      <motion.line x1="148" y1="138" x2="176" y2="138" stroke="#1D4A38" strokeWidth="2"
        variants={draw(0.55)} initial="hidden" animate="show" />
      <motion.line x1="304" y1="138" x2="332" y2="138" stroke="#1D4A38" strokeWidth="2"
        variants={draw(0.85)} initial="hidden" animate="show" />

      {/* traveling packets */}
      {[
        { from: 148, to: 176, delay: 1.5, color: "#B45309" },
        { from: 304, to: 332, delay: 2.3, color: "#B45309" },
        { from: 176, to: 148, delay: 3.1, color: "#1D4A38" },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cy="138" r="4.5" fill={p.color}
          initial={{ x: p.from, opacity: 0 }}
          animate={{ x: [p.from, p.to], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* nodes */}
      {nodes.map((n, i) => (
        <motion.g key={n.title} variants={rise(0.25 + i * 0.25)} initial="hidden" animate="show">
          <rect
            x={n.x} y="96" width="128" height="84" rx="10"
            fill={n.accent ? "#1D4A38" : "#F5F2EB"}
            stroke={n.accent ? "#1D4A38" : "#E3DDCF"}
            strokeWidth="1.5"
          />
          <text
            x={n.x + 64} y="129" textAnchor="middle"
            fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="700" letterSpacing="2"
            fill={n.accent ? "#FAF8F4" : "#211B14"}
          >
            {n.title}
          </text>
          <text
            x={n.x + 64} y="152" textAnchor="middle"
            fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="1"
            fill={n.accent ? "#C4D2C6" : "#6E6557"}
          >
            {n.sub}
          </text>
        </motion.g>
      ))}

      {/* caption chips */}
      {chips.map((c, i) => (
        <motion.g key={c} variants={rise(0.9 + i * 0.18)} initial="hidden" animate="show">
          <rect x={nodes[i].x} y="202" width="128" height="32" rx="7" fill="#F2EFE8" stroke="#E3DDCF" strokeWidth="1" />
          <text
            x={nodes[i].x + 64} y="222" textAnchor="middle"
            fontFamily="ui-monospace, monospace" fontSize="10" fill="#6E6557"
          >
            {c}
          </text>
        </motion.g>
      ))}

      <motion.text
        x="240" y="270" textAnchor="middle"
        fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.5" fill="#9A9081"
        variants={rise(1.5)} initial="hidden" animate="show"
      >
        p95 RESPONSE: 180ms
      </motion.text>
    </svg>
  );
}
