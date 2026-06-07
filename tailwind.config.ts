import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)", "Sora", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
      },
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        "bg-primary": "#080B14",
        "bg-secondary": "#0D1220",
        "accent-1": "#6366F1",
        "accent-2": "#06B6D4",
        "accent-3": "#A855F7",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "spin-slower": "spin 12s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px rgba(99, 102, 241, 0.4), 0 0 10px rgba(99, 102, 241, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 15px rgba(99, 102, 241, 0.6), 0 0 30px rgba(99, 102, 241, 0.3)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
