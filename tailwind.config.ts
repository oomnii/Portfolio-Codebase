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
        background: "var(--background)",
        "background-muted": "var(--background-muted)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-foreground": "var(--accent-foreground)",
        border: "var(--border)",
        surface: "var(--surface)",
        "button-primary": "var(--button-primary)",
        "button-primary-foreground": "var(--button-primary-foreground)",
        danger: "var(--danger)",
        success: "var(--success)",
        "brand-leetcode": "var(--brand-leetcode)",
        "brand-codeforces": "var(--brand-codeforces)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
