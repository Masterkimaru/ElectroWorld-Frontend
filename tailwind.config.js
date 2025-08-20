/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bright-red': 'var(--bright-red)',
        'deep-blue':  'var(--deep-blue)',
        'medium-purple': 'var(--medium-purple)',
        'light-gray': 'var(--light-gray)',
        charcoal:     'var(--charcoal)',
        'cool-gray':  'var(--cool-gray)',
      },
    },
  },
  plugins: [],
};