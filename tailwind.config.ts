import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    boxShadow: {
      inner_b: "inset 0px -1px 0px 0px rgb(209 213 219);",
      inner_t: "inset 0px 1px 0px 0px rgb(209 213 219);",
      inner_a: "inset 1px 0px 1px 1px rgb(209 213 219);",
    },
    borderColor: {
      none: "rgba(0,0,0,0)",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
