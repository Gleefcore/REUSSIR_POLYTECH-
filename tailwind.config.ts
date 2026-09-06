import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF3FC',
          100: '#D5E0F4',
          200: '#A8BFE9',
          300: '#6E93DB',
          400: '#3D6CC9',
          500: '#2450A8',
          600: '#1B3A80',
          700: '#12295F',
          800: '#0B1B45',
          850: '#081433',
          900: '#060F2A',
          950: '#030818',
        },
        gold: {
          50: '#FFF9EF',
          100: '#FFF1D8',
          200: '#FFE3B0',
          300: '#FFD285',
          400: '#FFB84D',
          500: '#F5A524',
          600: '#D18A0F',
          700: '#A66D08',
          800: '#8A5A06',
        },
      },
      fontFamily: {
        sans: ['var(--font-lexend)', 'system-ui', 'sans-serif'],
        display: ['var(--font-lexend)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'circuit-flow': {
          to: { strokeDashoffset: '-48' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 2.8s linear infinite',
        'pulse-glow': 'pulse-glow 3.2s ease-in-out infinite',
        'spin-slow': 'spin-slow 16s linear infinite',
        'circuit-flow': 'circuit-flow 2.6s linear infinite',
        scan: 'scan 5s linear infinite',
      },
      boxShadow: {
        'gold-glow': '0 0 24px rgba(245, 165, 36, 0.35)',
        'gold-glow-lg': '0 0 60px rgba(245, 165, 36, 0.28)',
        'navy-deep': '0 20px 60px rgba(3, 8, 24, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
