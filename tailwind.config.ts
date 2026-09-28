import type { Config } from "tailwindcss";

// Token system for "EFS Capital":
// - navy: institutional base, used for header, ticker bar, hero backdrop
// - graphite: body copy and structural text, never pure black
// - paper: warm-neutral reading background, never pure white
// - gold: single premium accent — section markers, links, emphasis
// - market-up / market-down: functional colors tied to real data (price moves),
//   not decoration — kept distinct from the gold accent on purpose.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#081324",
          900: "#0A1930",
          700: "#123157",
          500: "#1D4A82",
        },
        graphite: {
          900: "#1C222B",
          700: "#3A4452",
          500: "#5B6572",
          300: "#98A1AC",
        },
        paper: {
          DEFAULT: "#F7F6F2",
          dim: "#EDEBE4",
        },
        gold: {
          600: "#96721F",
          500: "#B8892B",
          300: "#D8B562",
        },
        market: {
          up: "#1F8A5F",
          down: "#B23A34",
        },
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
