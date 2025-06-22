/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        heading: ['Oswald', 'sans-serif'], // Or 'Lato', 'Roboto Condensed'
      },
    },
  },
  plugins: [],
}

