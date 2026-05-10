/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body': ['"DM Sans"', 'sans-serif'],
        'accent': ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        bloom: {
          50: '#fdf6f0',
          100: '#fae8d8',
          200: '#f5cdb0',
          300: '#eeab7e',
          400: '#e6834a',
          500: '#df6428',
          600: '#d14d1e',
          700: '#ad3b1a',
          800: '#8a301c',
          900: '#702a1a',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe2',
          200: '#c6d6c4',
          300: '#9bb89a',
          400: '#6d966c',
          500: '#4d784c',
          600: '#3b5f3b',
          700: '#304d30',
          800: '#283f28',
          900: '#213421',
        },
        petal: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
        },
        cream: '#faf7f2',
        dark: '#1a1a1a',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.4s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
