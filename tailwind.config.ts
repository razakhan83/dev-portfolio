import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper surfaces. No pure white anywhere.
        paper: "#FAF8F4",
        raised: "#F2EFE8",
        card: "#F5F2EB",
        line: "#E3DDCF",
        dashed: "#D8D1BF",
        ink: "#211B14",
        muted: "#6E6557",
        faint: "#9A9081",
        // Brand: deep pine + burnt amber. Two colors only.
        pine: {
          DEFAULT: "#1D4A38",
          deep: "#133325",
          ink: "#0E2A1E",
          soft: "#E4ECE5",
          line: "#C4D2C6",
        },
        amber: {
          DEFAULT: "#B45309",
          deep: "#92400E",
          soft: "#F7EAD3",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        // Layered micro-shadows only. No heavy drop shadows.
        xs: "0 1px 2px rgba(33, 27, 20, 0.05)",
        sm: "0 1px 2px rgba(33, 27, 20, 0.06), 0 2px 8px rgba(33, 27, 20, 0.05)",
        md: "0 2px 4px rgba(33, 27, 20, 0.06), 0 8px 24px rgba(33, 27, 20, 0.07)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.2s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
