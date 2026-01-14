import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './app/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // Charte graphique personnalisée
        'parata-blue': {
          DEFAULT: '#003366',
          dark: '#0B3C5D',
          light: '#1a4d7a',
        },
        'parata-gold': {
          DEFAULT: '#F4C542',
          light: '#f7d870',
          dark: '#d4a732',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
