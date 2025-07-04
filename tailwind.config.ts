import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: { 500: "#00C159", 600: "#00B051", 700: "#00893F" },
        grey: {
          50: "#E8E8E8",
          200: "#969696",
          300: "#949494",
          400: "#484848",
          500: "#1A1A1A"
        },
        dark: {
          900: "#050603",
          700: "#8B8B8B",
          500: "#8B8B8B"
        },
        accent: {
          50: "#FFEEEB",
          500: "#FF5733"
        },
        red: {
          700: "#B52C22"
        }
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        sm: "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
        md: "0px 24px 48px -12px rgba(16, 24, 40, 0.07)",
        lg: "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
