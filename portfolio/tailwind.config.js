/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cabinet Grotesk'", "'Sora'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#e0eaff",
          200: "#c1d4ff",
          300: "#93b4ff",
          400: "#5d8aff",
          500: "#3a67ff",
          600: "#1d47f5",
          700: "#1535e1",
          800: "#172db6",
          900: "#192b8f",
          950: "#111a55",
        },
        accent: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        surface: {
          light: "#fafafa",
          dark:  "#080c14",
        },
      },
      animation: {
        "float":      "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-ring": "pulseRing 1s ease-out forwards",
        "spin-slow":  "spin 20s linear infinite",
        "grain":      "grain 0.4s steps(1) infinite",
        "fade-up":    "fadeUp 0.6s ease forwards",
        "shimmer":    "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":      { transform: "translateY(-18px) rotate(1.5deg)" },
          "66%":      { transform: "translateY(-8px) rotate(-1deg)" },
        },
        pulseRing: {
          "0%":   { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":  { transform: "translate(-5%, -5%)" },
          "20%":  { transform: "translate(-10%, 5%)" },
          "30%":  { transform: "translate(5%, -10%)" },
          "40%":  { transform: "translate(-5%, 15%)" },
          "50%":  { transform: "translate(-10%, 5%)" },
          "60%":  { transform: "translate(15%, 0)" },
          "70%":  { transform: "translate(0, 10%)" },
          "80%":  { transform: "translate(-15%, 0)" },
          "90%":  { transform: "translate(10%, 5%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient":    "radial-gradient(at 40% 20%, hsla(228,100%,74%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(262,100%,76%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(220,100%,70%,0.1) 0px, transparent 50%)",
      },
      boxShadow: {
        "glow-sm":  "0 0 15px rgba(58,103,255,0.3)",
        "glow-md":  "0 0 30px rgba(58,103,255,0.4)",
        "glow-lg":  "0 0 60px rgba(58,103,255,0.25)",
        "card":     "0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-dark":"0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};
