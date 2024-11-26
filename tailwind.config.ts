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
        'leaf-1': "url('/images/backgrounds/leaf-bg-1.jpg')",
        'leaf-2': "url('/images/backgrounds/leaf-bg-2.jpg')",
        'leaf-3': "url('/images/backgrounds/leaf-bg-3.jpg')",
      },
      textColor: {
        "dark": "#3d3d3d",
        "semi-dark": "var(--clr-gray-semi)",
        "primary": "var(--text-primary)",
      },
      spacing: {
        "body": "2em 10vw",
        "y-body": "2em 0",
        "b-body": "0 0 2em",
        "header": "1em 5em"
      },
      fontFamily: {
        "anton": ["Anton", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
