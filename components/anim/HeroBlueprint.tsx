"use client";

import { motion } from "framer-motion";

/**
 * Animated system diagram: Client -> Next.js -> Database.
 * Lines draw themselves on scroll into view; data packets travel the wires.
 */
export function HeroBlueprint({ className = "" }: { className?: string }) {
  const line = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (d: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.9, delay: d, ease: "easeOut" as const },
    }),
  };

  const node = (d: number) => ({
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: d, ease: "easeOut" as const },
    },
  });

  const packet = (fromX: number, toX: number, delay: number) => ({
    animate: {
      x: [fromX, toX],
      opacity: [0, 1, 1, 0],
      transition: { duration: 2.4, delay, repeat: Infinity, ease: "linear" as const },
    },
  });

  const nodes = [
    { x: 14, title: "CLIENT", sub: "React UI", accent: false },
    { x: 182, title: "NEXT.JS", sub: "App Router", accent: true },
    { x: 350, title: "DATABASE", sub: "PostgreSQL", accent: false },
  ];

  return (
    <svg
      viewBox="0 0 480 300"
      fill="none"
      className={className}
      role="img"
      aria-label="Architecture diagram: client, Next.js server, and database connected by animated data flow"
    >
      {/* frame */}
      <motion.rect
        x="4" y="4" width="472" height="292" rx="12"
        stroke="#D8D1BF" strokeWidth="1.5" strokeDasharray="6 6"
        variants={line} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
      />

      {/* wires */}
      {[
        { x1: 138, x2: 178 },
        { x1: 306, x2: 346 },
      ].map((w, i) => (
        <motion.line
          key={i}
          x1={w.x1} y1="140" x2={w.x2} y2="140"
          stroke="#1D4A38" strokeWidth="2"
          variants={line} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.5 + i * 0.3}
        />
      ))}

      {/* traveling packets */}
      <motion.circle cx="0" cy="140" r="4.5" fill="#B45309" initial={false} animate={packet(138, 178, 1.4).animate} />
      <motion.circle cx="0" cy="140" r="4.5" fill="#B45309" initial={false} animate={packet(306, 346, 2.2).animate} />
      <motion.circle cx="0" cy="140" r="4.5" fill="#1D4A38" initial={false} animate={packet(178, 138, 2.8).animate} />

      {/* nodes */}
      {nodes.map((n, i) => (
        <motion.g
          key={n.title}
          variants={node(0.3 + i * 0.25)}
          initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <rect
            x={n.x} y="100" width="124" height="80" rx="10"
            fill={n.accent ? "#1D4A38" : "#F5F2EB"}
            stroke={n.accent ? "#1D4A38" : "#E3DDCF"}
            strokeWidth="1.5"
          />
          <text
            x={n.x + 62} y="133" textAnchor="middle"
            fontFamily="monospace" fontSize="13" fontWeight="700" letterSpacing="2"
            fill={n.accent ? "#FAF8F4" : "#211B14"}
          >
            {n.title}
          </text>
          <text
            x={n.x + 62} y="156" textAnchor="middle"
            fontFamily="monospace" fontSize="10" letterSpacing="1"
            fill={n.accent ? "#C4D2C6" : "#6E6557"}
          >
            {n.sub}
          </text>
        </motion.g>
      ))}

      {/* caption chips */}
      {[
        { x: 14, label: "SSR pages" },
        { x: 182, label: "Route handlers" },
        { x: 350, label: "Row-level auth" },
      ].map((c, i) => (
        <motion.g
          key={c.label}
          variants={node(0.9 + i * 0.2)}
          initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <rect x={c.x} y="206" width="124" height="30" rx="7" fill="#F2EFE8" stroke="#E3DDCF" strokeWidth="1" />
          <text x={c.x + 62} y="225" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#6E6557">
            {c.label}
          </text>
        </motion.g>
      ))}

      {/* latency readout */}
      <motion.text
        x="240" y="272" textAnchor="middle"
        fontFamily="monospace" fontSize="11" letterSpacing="1.5" fill="#9A9081"
        variants={node(1.4)} initial="hidden" whileInView="show" viewport={{ once: true }}
      >
        p95 RESPONSE: 180ms
      </motion.text>
    </svg>
  );
}
