import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    boxShadow: {
      inner: "inset 0px -1px 0px 0px rgba(0,0,0,0.3);",
    },
    borderColor: {
      none: "rgba(0,0,0,0)",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
