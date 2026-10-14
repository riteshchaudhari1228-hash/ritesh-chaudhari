/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maze: {
          bg: '#f8fafc',
          surface: '#ffffff',
          dark: '#0f172a',
          wall: '#1e293b',
          path: '#f1f5f9',
          visited: '#dbeafe',
          visitedBorder: '#93c5fd',
          backtrack: '#f1f5f9',
          solution: '#3b82f6',
          solutionGreen: '#10b981',
          player: '#10b981',
          playerDark: '#059669',
          exit: '#f59e0b',
          exitDark: '#d97706',
          coral: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseWall: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)', backgroundColor: '#ef4444' },
        },
        playerMove: {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        pop: 'pop 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        pulseWall: 'pulseWall 0.25s ease-in-out',
        playerMove: 'playerMove 0.15s ease-out'
      }
    },
  },
  plugins: [],
}
