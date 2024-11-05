/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'china-red': '#DE2910',
        'china-yellow': '#FFDE00',
      },
    },
  },
  plugins: [],
}