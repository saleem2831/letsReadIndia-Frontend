/** @type {import('tailwindcss').Config} */
export default {
   content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'child-purple': '#A855F7',
        'child-pink': '#EC4899',
        'child-yellow': '#F6C548',
        'child-blue': '#3B82F6',
        'child-green': '#10B981',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        comic: ['Comic Sans MS', 'Comic Neue', 'Comic Sans', 'cursive', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'scaleIn': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'floatSlow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        scaleIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        floatSlow: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '.35' },
          '50%': { transform: 'translateY(-8px) scale(1.03)', opacity: '.45' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '.35' },
        },
      },
    },
  },
  plugins: [],
}