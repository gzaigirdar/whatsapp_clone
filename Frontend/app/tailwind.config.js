/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css,html}",
  ],
 
  theme: {
    extend: {
      colors:{
        red_1:"red"
      }
    },
  },
  plugins: [],
}