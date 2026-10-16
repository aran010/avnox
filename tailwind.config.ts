import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        avnox: {
          ink: "#0A0A0B",
          navy: "#0C1018",
          surface: "#12141A",
          elevated: "#181B22",
          muted: "#9A9AA3",
          faint: "#C8C8CE",
          accent: "#FFB020",
          hot: "#FF7A00",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 8vw, 5.5rem)",
          { lineHeight: "0.96", letterSpacing: "-0.05em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2.1rem, 4.8vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.7rem, 3.2vw, 2.6rem)",
          { lineHeight: "1.12", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(255, 176, 32, 0.55)",
        "glow-sm": "0 0 28px -6px rgba(255, 176, 32, 0.4)",
        lift: "0 22px 60px -24px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "space-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 176, 32, 0.16), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(255, 122, 0, 0.08), transparent 50%)",
      },
      transitionTimingFunction: {
        avnox: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(1.5%, -2.5%, 0) scale(1.06)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.8" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        drift: "drift 16s ease-in-out infinite",
        "pulse-soft": "pulse-soft 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
