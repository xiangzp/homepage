/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        xborder: '#f4f6fb'
      }
    },
  },
  plugins: [],
}

