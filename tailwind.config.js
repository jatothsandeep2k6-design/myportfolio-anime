export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { bg: '#07141c', accent: '#22d3ee', accent2: '#2dd4bf' },
      fontFamily: { sans: ['Outfit', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      keyframes: { blob: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(30px,-40px) scale(1.15)' } } },
      animation: { blob: 'blob 10s infinite' }
    }
  }
}
