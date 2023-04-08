/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "hsl(209, 23%, 22%)", // Dark mode elements
        veryDarkBlue1: "hsl(207, 26%, 17%)", // dark mode background
        veryDarkBlue2: "hsl(200, 15%, 8%)", // light mode text
        darkGray: "hsl(0, 0%, 52%)", // light mode input
        veryLightGray: "hsl(0, 0%, 98%)", // light mode background
        myWhite: "hsl(0, 0%, 100%)", // Dark Mode Text & Light Mode Elements
      },
    },
  },
  plugins: [],
};
