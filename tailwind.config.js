/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif']
      },
      colors: {
        neonBlue: '#00f5ff',
        neonPurple: '#a855f7',
        neonGreen: '#10b981',
        metallicDark: '#0a0a0f',
        metallicGray: '#1c1c1c'
      },
    },
  },
  plugins: [],
}
