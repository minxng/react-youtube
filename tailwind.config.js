/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#FF0000",
        gray: "#606060",
      },
      padding: {
        "10vw": "5vw",
      },
    },
  },
  plugins: [],
};
