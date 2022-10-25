/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns : {
        '18' : 'repeat(18, minmax(0, 1fr))'
      },
      gridColumn : {
        'span-16' : 'span 16 / span 16'
      }
    },
  },
  plugins: [],
}
