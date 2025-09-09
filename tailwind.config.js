/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sarya-purple': '#8C5BAA',
        'sunshine-yellow': '#F4C542',
        'friendly-red': '#D9534F',
        'grass-green': '#7CAF3F',
        'sky-blue': '#58AEDA',
        'soft-lavender': '#D9CCEC',
        'muted-beige': '#FAF5ED',
        'deep-brown': '#4A3C2D',
        'cloud-white': '#F7F9FB',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
