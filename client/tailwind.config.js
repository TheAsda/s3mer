module.exports = {
  purge: ['index.html', 'src/**/*.{ts,tsx}'],
  // mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cello: {
          DEFAULT: '#1C3C55',
          50: '#C6DBEC',
          100: '#ABCBE3',
          200: '#75A9D2',
          300: '#4088C0',
          400: '#2E628B',
          500: '#1C3C55',
          600: '#162E42',
          700: '#0F212F',
          800: '#09131B',
          900: '#030608',
        },
        'bright-sun': {
          DEFAULT: '#F8DA3D',
          50: '#FEFCEE',
          100: '#FEF8DB',
          200: '#FCF1B3',
          300: '#FBE98C',
          400: '#F9E264',
          500: '#F8DA3D',
          600: '#F7D216',
          700: '#DBBA08',
          800: '#B49806',
          900: '#8D7705',
        },
        calypso: {
          DEFAULT: '#337192',
          50: '#C1DBE9',
          100: '#AED1E3',
          200: '#88BBD6',
          300: '#63A5C8',
          400: '#408EB8',
          500: '#337192',
          600: '#26546C',
          700: '#193646',
          800: '#0B1921',
          900: '#000000',
        },
        gigas: {
          DEFAULT: '#5E4096',
          50: '#DAD0EB',
          100: '#CBBFE3',
          200: '#AF9BD4',
          300: '#9277C5',
          400: '#7653B6',
          500: '#5E4096',
          600: '#483172',
          700: '#31214F',
          800: '#1B122B',
          900: '#040307',
        },
        'pastel-green': {
          DEFAULT: '#57DF82',
          50: '#F1FCF5',
          100: '#E0F9E8',
          200: '#BEF3CF',
          300: '#9CECB5',
          400: '#79E69C',
          500: '#57DF82',
          600: '#35D869',
          700: '#25C056',
          800: '#1E9E46',
          900: '#177B37',
        },
        carnation: {
          DEFAULT: '#FB6767',
          50: '#FFEDED',
          100: '#FEDEDE',
          200: '#FDC0C0',
          300: '#FDA3A3',
          400: '#FC8585',
          500: '#FB6767',
          600: '#FA3535',
          700: '#F60606',
          800: '#C40505',
          900: '#920404',
        },
      },
      animation: {
        gradient: 'flow 1s ease infinite',
        'fade-in': 'fade-in 0.5s ease forwards',
        'slide-down': 'slide-down 0.5s ease forwards',
      },
      backgroundSize: {
        500: '500% 500%',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
            transform: 'translateY(100%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        flow: {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
