const colors =  require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'teal': colors.teal,
        'indigo': colors.indigo,
        'true-gray': colors.trueGray,
        // 'cool-gray': colors.coolGray,
        // 'warm-gray': colors.warmGray,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
