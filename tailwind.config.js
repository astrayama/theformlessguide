/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e1a',
        panel: '#1a2035',
        teal: '#00f5d4',
        purple: '#7b2fff',
        cream: '#f2ecdf',
        secondary: '#c2c8dc',
        muted: '#8a96b8',
      },
      fontFamily: {
        sans: ['"TikTok Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
        display: ['Cinzel', 'serif'],
        cinzel: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
