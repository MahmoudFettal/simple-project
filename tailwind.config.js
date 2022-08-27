/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      500: "325px",
    },
    extend: {
      colors: {
        notFound: "#F2949C",
      },
      maxWidth: {
        "8xl": "96rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
