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
      animation: {
        "pulse-fast": "pulse 1s linear infinite",
      },
      gridTemplateAreas: {
        gameLayoutLarge: [". header .", "playerOne chart playerTwo"],
        gameLayoutTablet: [
          "header header",
          "playerOne playerTwo",
          "chart chart",
        ],
        gameLayoutMobile: [
          "header header",
          "playerOne playerTwo",
          "chart chart",
        ],
      },
      gridTemplateColumns: {
        gameLayoutLarge: "max-content 1fr max-content",
        gameLayoutTablet: "1fr 1fr",
        gameLayoutMobile: "1fr 1fr",
      },
      gridTemplateRows: {},
      colors: {
        black: "#000",
        purple: "#7945FF",
        "dark-purple": "#5C2DD5",
        red: "#FD6687",
        yellow: "#FFCE67",
        white: "#fff",
      },

      boxShadow: {
        disc: "inset 0px 5px 0px 0px rgba(0,0,0,0.5)",
        "disc-empty": "inset 0px 10px 0px 0px rgba(0,0,0)",
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
export default config;
