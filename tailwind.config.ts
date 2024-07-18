import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: {
        max: "48rem",
      },
      md: {
        min: "48rem",
        max: "60rem",
      },
      mdsm: {
        max: "60rem",
      },
      lgmd: { min: "48rem" },
      lg: {
        min: "60rem",
      },
    },
    extend: {
      colors: {
        black: "#000",
        purple: "#7945FF",
        "dark-purple": "#5C2DD5",
        red: "#FD6687",
        yellow: "#FFCE67",
        white: "#fff",
      },
    },
  },
  plugins: [],
};
export default config;
