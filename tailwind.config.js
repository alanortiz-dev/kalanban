// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // ya lo tienes probablemente
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        background: {
          DEFAULT: '#F5F5F7', // fondo claro suave
          dark: '#121212',     // fondo oscuro profesional
        },
        foreground: {
          DEFAULT: '#1A1A1A',
          dark: '#E5E5E5',
        },
        accent: {
          DEFAULT: '#7C3AED', // lavanda / violeta pro
          hover: '#6D28D9',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1F1F1F',
        },
      },
    },
  },
  plugins: [],
};
