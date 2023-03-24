/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // comfortaa: ['Comfortaa', 'cursive'],
        // inter: ['Inter', 'sans-serif'],
        avenir: 'avenir'
      }
    },
  },
  plugins: [],
}
