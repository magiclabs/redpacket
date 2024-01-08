import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        festive: {
          primary: "#E33333",
          'primary-content': "#ffffff",
          'base-100': "#ffffff"
        },
      },
    ]
  },
  plugins: [require("daisyui")],
};
export default config;
