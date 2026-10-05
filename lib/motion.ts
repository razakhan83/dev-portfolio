import type { Variants } from "framer-motion";

/**
 * Shared motion language for the portfolio.
 * Fast, subtle, engineering-grade: 100-150ms ease-out transitions,
 * small 12-20px reveals, zero bloat.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

/** Viewport config reused by every scroll reveal. */
export const revealViewport = { once: true, margin: "-80px" } as const;

/** Micro-interaction for buttons and links. */
export const tapScale = { whileTap: { scale: 0.97 } };

/** Arrow nudge used on "view project" links. */
export const arrowNudge = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.15, ease: "easeOut" } },
};
