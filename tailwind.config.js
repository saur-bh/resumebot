/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sarya-purple': '#6366F1', // Modern indigo
        'sunshine-yellow': '#F59E0B', // Amber
        'friendly-red': '#EF4444', // Red
        'grass-green': '#10B981', // Emerald
        'sky-blue': '#3B82F6', // Blue
        'soft-lavender': '#E0E7FF', // Light indigo
        'muted-beige': '#F8FAFC', // Slate 50
        'deep-brown': '#1F2937', // Gray 800
        'cloud-white': '#FFFFFF', // Pure white
        'chat-bg': '#F1F5F9', // Slate 100
        'chat-user': '#3B82F6', // Blue
        'chat-bot': '#F8FAFC', // Slate 50
        'accent-purple': '#8B5CF6', // Violet
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
