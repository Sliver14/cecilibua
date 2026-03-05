import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'gold-dark': '#B8860B',
        burgundy: '#800020',
        'burgundy-light': '#A00030',
        cream: '#F5F1E6',
        charcoal: '#1A1A1A',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-gold-burgundy': 'linear-gradient(135deg, #D4AF37 0%, #800020 100%)',
        'gradient-burgundy-gold': 'linear-gradient(135deg, #800020 0%, #D4AF37 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' },
        },
        shimmer: {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
} satisfies Config

export default config
