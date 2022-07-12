/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      aspectRatio: {
        '3/2': '3 / 2',
      },
    },
  },
  plugins: [],
};
