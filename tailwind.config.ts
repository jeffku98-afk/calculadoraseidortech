import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seidor: {
          50: "#E1EDF9",
          100: "#7BBCF8",
          200: "#5F7AD7",
          300: "#4464E2",
          400: "#3447B0",
          500: "#8490B4",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#E1EDF9",
              100: "#7BBCF8",
              200: "#5F7AD7",
              300: "#4464E2",
              400: "#3447B0",
              500: "#3447B0",
              600: "#3447B0",
              700: "#3447B0",
              800: "#3447B0",
              900: "#3447B0",
              DEFAULT: "#4464E2",
              foreground: "#ffffff",
            },
            focus: "#4464E2",
          },
        },
      },
    }),
  ],
};

export default config;