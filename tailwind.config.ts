import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#18181B",
        surface: {
          DEFAULT: "#212124",
          raised: "#19191B",
          overlay: "#0D0D0E",
        },
        foreground: "#FFFFFF",
        muted: "rgba(255, 255, 255, 0.56)",
        subtle: "rgba(255, 255, 255, 0.32)",
        accent: {
          white: "#FFFFFF",
          gray: "#D8D8D8",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.12)",
          hover: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionTimingFunction: {
        morph: "cubic-bezier(0.25, 1.25, 0.5, 1)",
      },
      backgroundImage: {
        "gradient-overlay":
          "radial-gradient(circle, rgba(33,33,36,0.44) 0%, #121212 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        spinSlow: "spin 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.35)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
