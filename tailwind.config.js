/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'base-blue': '#0052FF',
        'base-dark': '#0A0B0D',
        'base-light': '#F8F9FA',
        'base-gray': '#6B7280',
        'base-green': '#10B981',
        'base-red': '#EF4444',
        'base-yellow': '#F59E0B',
        'base-purple': '#8B5CF6',
        'base-pink': '#EC4899',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-base': 'linear-gradient(135deg, #0052FF 0%, #8B5CF6 50%, #EC4899 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0B0D 0%, #1F2937 50%, #374151 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'base': '0 4px 6px -1px rgba(0, 82, 255, 0.1), 0 2px 4px -1px rgba(0, 82, 255, 0.06)',
        'base-lg': '0 10px 15px -3px rgba(0, 82, 255, 0.1), 0 4px 6px -2px rgba(0, 82, 255, 0.05)',
        'base-xl': '0 20px 25px -5px rgba(0, 82, 255, 0.1), 0 10px 10px -5px rgba(0, 82, 255, 0.04)',
      },
    },
  },
  plugins: [],
}