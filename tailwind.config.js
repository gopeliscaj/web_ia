/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crema: {
          50: '#FBF8F1',
          100: '#F6EFE2',
          200: '#ECDFC6',
          300: '#DAC49E',
          400: '#C4A878',
        },
        barro: {
          300: '#D9A074',
          400: '#C2825A',
          500: '#A8663A',
          600: '#8A4F26',
          700: '#6D3C1A',
          800: '#4E2A12',
          900: '#2F1A0B',
        },
        ocre: {
          300: '#EDC875',
          400: '#DBA93E',
          500: '#BC8828',
          600: '#936520',
        },
        andino: {
          300: '#7BAE8E',
          400: '#5A8F6E',
          500: '#3E6F54',
          600: '#2E5540',
          700: '#1F3D2D',
        },
        tinta: {
          700: '#3A3026',
          800: '#251F18',
          900: '#15110D',
          950: '#0C0907',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-display': 'clamp(2.75rem, 8vw, 7.5rem)',
        'fluid-hero': 'clamp(3rem, 9vw, 8.5rem)',
        'fluid-h2': 'clamp(2rem, 5vw, 4rem)',
        'fluid-h3': 'clamp(1.5rem, 3vw, 2.25rem)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tightish: '-0.025em',
      },
      borderRadius: {
        '4xl': '1.75rem',
        '5xl': '2.5rem',
      },
      maxWidth: {
        '8xl': '84rem',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(21,17,13,0.04), 0 8px 32px -12px rgba(21,17,13,0.08)',
        'soft-lg': '0 2px 8px rgba(21,17,13,0.06), 0 24px 48px -16px rgba(21,17,13,0.12)',
        'lift': '0 12px 40px -12px rgba(21,17,13,0.18)',
        'warm': '0 8px 40px -12px rgba(138,79,38,0.25)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'draw-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1s ease both',
        'scale-in': 'scale-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 45s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'draw-line': 'draw-line 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.22, 1.2, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
