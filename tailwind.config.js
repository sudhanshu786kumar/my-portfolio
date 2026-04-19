/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          void: '#04040f',
          deep: '#080820',
          mid: '#0d0d2b',
          nebula: '#12123a',
        },
        neon: {
          purple: '#a855f7',
          cyan: '#22d3ee',
          blue: '#60a5fa',
          magenta: '#e879f9',
          gold: '#fbbf24',
          emerald: '#34d399',
        },
        text: {
          primary: '#f0f0ff',
          secondary: '#c4c4e0',
          muted: '#7878a8',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 24px rgba(168, 85, 247, 0.40)',
        'glow-cyan': '0 0 24px rgba(34, 211, 238, 0.35)',
        'glow-subtle': '0 4px 32px rgba(168, 85, 247, 0.15)',
        'card': '0 8px 40px rgba(0, 0, 0, 0.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}