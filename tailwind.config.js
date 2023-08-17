/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: {
            height: 0,
          },
          to: {
            height: 'var(--radix-collapsible-content-height)',
          },
        },

        slideUp: {
          from: {
            height: 'var(--radix-collapsible-content-height)',
          },
          to: {
            height: 0,
          },
        },
      },
      animation: {
        'slide-up': 'slideUp 300ms ease-out',
        'slide-down': 'slideDown 300ms ease-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
