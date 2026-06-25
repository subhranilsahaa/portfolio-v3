/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        bg: '#000000',
        surface: '#0b0d14',
        surface2: '#10131e',
        border: 'rgba(255,255,255,0.06)',
        accent: '#7eaaff',
        'accent-dim': 'rgba(126,170,255,0.1)',
        text: '#e4e8f4',
        muted: '#525878',
        danger: '#e05c5c',
      },
      animation: {
        'grad-move': 'gradMove 6s linear infinite',
        'btn-gloss': 'btnGloss 3s ease-in-out infinite',
        'shimmer': 'shimmer 5s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'scroll-anim': 'scrollAnim 1.6s ease-in-out infinite',
      },
      keyframes: {
        gradMove: {
          'to': { backgroundPosition: '300% center' },
        },
        btnGloss: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '-80% 0' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        scrollAnim: {
          '0%': { opacity: 0, transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { opacity: 1, transform: 'scaleY(1)', transformOrigin: 'top' },
          '100%': { opacity: 0, transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
      },
    },
  },
  plugins: [],
};
