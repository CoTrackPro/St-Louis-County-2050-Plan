import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  // Dynamic accentColor classes (text-brand-500, text-indigo-400, text-green-500,
  // text-orange-500) are safe from purging:
  //   • text-brand-500 is defined in globals.css @layer utilities (always included)
  //   • text-indigo-400 / text-green-500 / text-orange-500 appear literally in
  //     src/data/roles.ts, which is covered by the content glob above
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
