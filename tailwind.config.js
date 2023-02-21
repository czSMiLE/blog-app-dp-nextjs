/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#007BFF',
          100: '#2B7EFB',
        },
        borderGrey: '#DFDFDF',
        mediumGrey: '#6C757D',
        dark: '#212529',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
