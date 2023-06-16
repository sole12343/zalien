/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "plus-jakarta-sans": ['"Plus Jakarta Sans"', "sans-serif"],
    },
    extend: {
      backgroundColor: {
        default: "gray-900",
      },
    },
  },
  plugins: [require("daisyui")],
};
