/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
],
  theme: {
    extend: {
      width: {
        '1110': '1110px'
      },
      backgroundColor : {
        primary: '#F5F5F5',
        secondary1: "#1266dd",
        secondary2: "#f75839"
      },
      maxWidth: {
        '600': '600px',
        '1100': '1100px'
      },
      minWidth: {
        '300': '300px',
        '200': '200px'
      },
      cursor: {
        pointer: 'pointer'
      },
    },
  },
  plugins: [],
}