/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#FFDBFD', // Accent
          100: '#EBDDFF',
          200: '#C9BEFF', // Tertiary
          300: '#AAB0FF',
          400: '#8494FF', // Secondary
          500: '#737EFF',
          600: '#6367FF', // Primary
          700: '#5256E6',
          800: '#4145CC',
          900: '#3034B3',
          950: '#202399',
        },
        cyan: {
          50: '#FFDBFD',
          100: '#FFDBFD',
          200: '#FFDBFD',
          300: '#EBDDFF',
          400: '#C9BEFF',
          500: '#C9BEFF',
          600: '#8494FF',
          700: '#6367FF',
          800: '#5256E6',
          900: '#4145CC',
          950: '#3034B3',
        }
      }
    },
  },
  plugins: [],
};

