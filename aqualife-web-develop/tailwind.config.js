/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "1rem",
          lg: "2rem",
          xl: "5rem",
        },
        screens: {
          sm: "428px",
          md: "728px",
          lg: "1024px",
          xl: "1280",
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [],
});

