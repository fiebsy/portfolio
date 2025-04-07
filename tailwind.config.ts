import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        fuego: {
          1: "#fbfde8",
          2: "#f3fbcc",
          3: "#e7f6a0",
          4: "#d5ee68",
          5: "#b8dd23",
          6: "#a2c61c",
          7: "#7d9e12",
          8: "#5f7912",
          9: "#4d6014",
          10: "#415116",
          11: "#314110",
          12: "#212d06",
        },
        gray: {
          1: "#fcfcfc",
          2: "#f8f8f8",
          3: "#f2f2f2",
          4: "#e9e9e9",
          5: "#e5e5e5",
          6: "#d4d4d4",
          7: "#c0c0c0",
          8: "#b9b9b9",
          9: "#a3a3a3",
          10: "#8c8c8c",
          11: "#737373",
          12: "#525252",
          13: "#404040",
          14: "#303030",
          15: "#262626",
          16: "#171717",
          17: "#0a0a0a",
          18: "#000000",
        },
      },
    },
  },
  plugins: [],
};

export default config; 