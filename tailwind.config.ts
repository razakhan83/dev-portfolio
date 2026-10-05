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
        // Clean neutral surfaces. Strict 1-accent system.
        paper: "#FFFFFF",
        raised: "#F7F7F9",
        card: "#FFFFFF",
        line: "#E4E4E7",
        dashed: "#D4D4D8",
        ink: "#09090B",
        muted: "#52525B",
        faint: "#A1A1AA",
        // Brand: cobalt blue. Secondary: sky. Nothing else.
        brand: {
          DEFAULT: "#2B4BFF",
          deep: "#1E38D8",
          ink: "#1729A8",
          soft: "#EEF1FF",
          line: "#C7D2FE",
        },
        sky: {
          DEFAULT: "#0284C7",
          deep: "#0369A1",
          soft: "#E0F2FE",
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
        xs: "0 1px 2px rgba(9, 9, 11, 0.05)",
        sm: "0 1px 2px rgba(9, 9, 11, 0.06), 0 2px 8px rgba(9, 9, 11, 0.05)",
        md: "0 2px 4px rgba(9, 9, 11, 0.06), 0 12px 32px rgba(9, 9, 11, 0.08)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
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
