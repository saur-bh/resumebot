/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gen Z Trendy Color Palette
        'neon-pink': '#FF10F0',
        'electric-blue': '#00D4FF',
        'lime-green': '#39FF14',
        'purple-rain': '#8B5CF6',
        'cyber-orange': '#FF6B35',
        'matrix-green': '#00FF41',
        'cosmic-purple': '#6366F1',
        'sunset-orange': '#FF8C42',
        'mint-fresh': '#00F5FF',
        'hot-pink': '#FF1493',
        
        // Glassmorphism & Modern Colors
        'glass-white': 'rgba(255, 255, 255, 0.25)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)',
        'dark-bg': '#0F0F23',
        'card-bg': 'rgba(255, 255, 255, 0.1)',
        'border-glow': 'rgba(255, 255, 255, 0.2)',
        
        // Legacy colors (keeping for compatibility)
        'sarya-purple': '#8B5CF6', // Updated to purple-rain
        'sunshine-yellow': '#FF8C42', // Updated to sunset-orange
        'friendly-red': '#FF6B35', // Updated to cyber-orange
        'grass-green': '#39FF14', // Updated to lime-green
        'sky-blue': '#00D4FF', // Updated to electric-blue
        'soft-lavender': '#E0E7FF', // Light indigo
        'muted-beige': '#F8FAFC', // Slate 50
        'deep-brown': '#1F2937', // Gray 800
        'cloud-white': '#FFFFFF', // Pure white
        'chat-bg': '#0F0F23', // Updated to dark-bg
        'chat-user': '#00D4FF', // Updated to electric-blue
        'chat-bot': '#8B5CF6', // Updated to purple-rain
        'accent-purple': '#FF10F0', // Updated to neon-pink
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'neon-flicker': 'neonFlicker 1.5s linear infinite',
        'cyber-glow': 'cyberGlow 2s ease-in-out infinite alternate',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        neonFlicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        cyberGlow: {
          '0%': { 
            boxShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF',
            textShadow: '0 0 5px #00D4FF'
          },
          '100%': { 
            boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF',
            textShadow: '0 0 10px #00D4FF'
          },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(45deg, #FF10F0, #00D4FF, #39FF14, #8B5CF6)',
        'cosmic-gradient': 'linear-gradient(135deg, #0F0F23 0%, #1a1a3a 50%, #2d1b69 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
