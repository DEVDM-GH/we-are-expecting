/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        lato: ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: '#F5ECD7',
        gold: '#C9A84C',
        'gold-light': '#E8C96A',
        blush: '#F4B8C1',
        sage: '#8FAF8A',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.8)' },
          '50%': { opacity: '0.8', transform: 'scale(1.4)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 18px 6px rgba(201,168,76,0.3)' },
          '50%': { boxShadow: '0 0 40px 18px rgba(201,168,76,0.65)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'page-out': {
          '0%': { transform: 'perspective(900px) rotateY(0deg)', opacity: '1' },
          '100%': { transform: 'perspective(900px) rotateY(-90deg)', opacity: '0' },
        },
        'page-in': {
          '0%': { transform: 'perspective(900px) rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'perspective(900px) rotateY(0deg)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.9s ease forwards',
        'fade-in-up': 'fade-in-up 0.8s ease forwards',
        twinkle: 'twinkle var(--tw-duration, 3s) ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'page-out': 'page-out 0.38s ease-in forwards',
        'page-in': 'page-in 0.38s ease-out forwards',
      },
    },
  },
  plugins: [],
}
