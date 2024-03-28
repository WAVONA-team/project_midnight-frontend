/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      openSans: ['Open Sans', 'sans-serif'],
      notoSans: ['Noto Sans', 'sans-serif'],
      ubuntu: ['Ubuntu', 'sans-serif'],
    },

    colors: {
      background: {
        hight: '#0B0D0B',
      },
      error: {
        'turkey-red': '#A90000',
        'imperial-red': '#EF4444',
      },
      primary: {
        poppy: '#DA2F37',
        'fire-brick': '#BF222A',
        madder: '#9C1C22',
        'misty-rose': '#F4D5D5',
      },
      'on-primary': {
        misty_rose: '#F4D5D5',
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
        jet: '#1E201D',
      },
      'on-secondary': {
        'dim-gray': '#696969',
        platinum: '#E1E1E1',
        'davys-gray': '#5F5F5F',
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
      boxShadow: {
        'button-default':
          '-3px -3px 8px 0px rgba(8, 8, 7, 0.9), ' +
          '3px 3px 6px 0px rgba(30, 34, 29, 0.9), ' +
          '-3px 3px 6px 0px rgba(8, 8, 7, 0.2), ' +
          '3px -3px 6px 0px rgba(8, 8, 7, 0.2), ' +
          '1px 1px 2px 0px rgba(8, 8, 7, 0.5) inset, ' +
          '-1px -1px 2px 0px rgba(30, 34, 29, 0.3) inset',
        'button-active':
          '3px 3px 8px 0px rgba(8, 8, 7, 0.9) inset, ' +
          '-3px -3px 6px 0px rgba(30, 34, 29, 0.9) inset, ' +
          '3px -3px 6px 0px rgba(8, 8, 7, 0.2) inset, ' +
          '-3px 3px 6px 0px rgba(8, 8, 7, 0.2) inset, ' +
          '-1px -1px 2px 0px rgba(8, 8, 7, 0.5), ' +
          '1px 1px 2px 0px rgba(30, 34, 29, 0.3)',
      },
      backgroundImage: {
        'play-button-small-gradient-default':
          'linear-gradient(135deg, #141613 0%, #121411 100%)',
        'play-button-big-gradient-default':
          'radial-gradient(73.91% 73.91% at 50% 51.09%, rgba(255, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), ' +
          'linear-gradient(135deg, #141613 0%, #121411 100%)',
        'play-button-big-gradient-hover':
          'radial-gradient(73.91% 73.91% at 50% 51.09%, rgba(255, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), ' +
          'linear-gradient(135deg, #141613 0%, #121411 100%)',
        'background-desktop': `linear-gradient(0deg, #0b0d0b, #0b0d0b),
          radial-gradient(
            35.35% 48.59% at 95.69% 96.29%,
            rgba(218, 47, 55, 0.1) 0%,
            rgba(218, 47, 55, 0) 100%
          ),
          radial-gradient(
            5.73% 7.96% at 96.28% 66.75%,
            rgba(218, 47, 55, 0.1) 0%,
            rgba(218, 47, 55, 0) 76.29%
          );`,
      },
    },
  },
  plugins: [],
};
