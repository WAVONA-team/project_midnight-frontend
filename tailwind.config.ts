/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    colors: {
      background: {
        hight: '#0B0D0B',
      },
      error: {
        'turkey-red': '#A90000',
      },
      primary: {
        poppy: '#DA2F37',
        'fire-brick': '#BF222A',
        madder: '#9C1C22',
      },
      'on-primary': {
        'lavender-blush': '#FCEEEE',
        'anti-flash-white': '#FFFFFF',
      },
      surface: {
        eerie_black: '#171916',
        black: '#0B0D0B',
      },
      secondary: {
        'cadet-gray': '#A09F9F',
        'eerie-black-light': '#212320',
        glaocous: '#70799A',
      },
      'on-secondary': {
        'dim-gray': '#696969',
        platinum: '#E1E1E1',
      },
      'sub-colors': {
        inherit: 'inherit',
      },
    },

    extend: {
      gradientColorStopPositions: {
        100: '100%',
        85: '85%',
        60: '60%',
        20: '20%',
        5: '5%',
        0: '0%',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
