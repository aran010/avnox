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
          dark: "#0a0a0a",
          surface: "#111111",
          elevated: "#151515",
          card: "#1a1a1a",
          border: "rgba(255, 255, 255, 0.06)",
          orange: "#F26B1D",
          "orange-light": "#FF8A3D",
          "orange-deep": "#E8491D",
          muted: "#999999",
          faint: "#666666",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "var(--font-inter)",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": [
          "clamp(3rem, 8vw, 5.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2rem, 4.8vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.5rem, 3.2vw, 2.5rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(242, 107, 29, 0.4)",
        "glow-sm": "0 0 30px -6px rgba(242, 107, 29, 0.25)",
        "glow-lg": "0 0 100px -20px rgba(242, 107, 29, 0.5)",
        lift: "0 22px 60px -24px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(242, 107, 29, 0.15), transparent 60%)",
        "card-glow": "radial-gradient(ellipse at 50% 0%, rgba(242, 107, 29, 0.08), transparent 60%)",
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
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        drift: "drift 16s ease-in-out infinite",
        "pulse-soft": "pulse-soft 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
