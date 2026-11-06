/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        script: ['Caveat', 'cursive'],
      },
      colors: {
        // Rose palette (main accent)
        brand: {
          50: '#fff1f7',
          100: '#ffe4f0',
          200: '#fecde3',
          300: '#fda4cb',
          400: '#f973ab',
          500: '#ec4899',
          600: '#d6337f',
          700: '#b02367',
          800: '#8c1d53',
          900: '#6b1840',
        },
        lilac: { 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7' },
        peach: { 100: '#ffede3', 200: '#fed7c3', 300: '#fdba9a' },
        ink: { DEFAULT: '#2d1b33', soft: '#6b5671' },
        plum: { 900: '#160b17', 800: '#21111f', 700: '#2c1729' },
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-14px) rotate(8deg)' } },
        twinkle: { '0%,100%': { opacity: '0.25', transform: 'scale(.8)' }, '50%': { opacity: '1', transform: 'scale(1.15)' } },
        morph: {
          '0%,100%': { borderRadius: '62% 38% 46% 54% / 55% 48% 52% 45%' },
          '33%': { borderRadius: '40% 60% 58% 42% / 44% 58% 42% 56%' },
          '66%': { borderRadius: '54% 46% 38% 62% / 60% 40% 60% 40%' },
        },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        morph: 'morph 10s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
