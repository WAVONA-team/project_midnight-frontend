/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    colors: {
      'background' : {
        'hight': '#0B0D0B',
      },
      'error': {
        'turkey_red': '#A90000',
      },
      'primary': {
        'poppy': '#DA2F37',
        'fire_brick': '#BF222A',
        'madder': '#9C1C22',
      },
      'on_primary': {
        'lavender_blush': '#FCEEEE',
        'anti-flash_white': '#FFFFFF',
      },
      'surface': {
        'eerie_black': '#171916',
        'black': '#0B0D0B',
      },
      'secondary': {
        'cadet_gray': '#A09F9F',
        'eerie_black_light': '#1D1F1C',
      },
      'on_secondary': {
        'dim_gray': '#696969',
        'platinum': '#E1E1E1'
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
      }
    },
  },
  plugins: [],
};
