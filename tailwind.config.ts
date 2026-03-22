import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  // Safelist dynamic accent classes used in roles.ts (assembled at runtime, not statically scanned)
  safelist: [
    "text-brand-500",
    "text-indigo-400",
    "text-green-500",
    "text-orange-500",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          // Match the sky-blue brand defined in globals.css custom utilities
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          900: "#0c4a6e",
        },
      },
    },
  },
  plugins: [],
};

export default config;
