/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        navy: { DEFAULT: '#060810', light: '#0a0e1a' },
      },
      boxShadow: {
        'glow-cyan': '0 0 60px rgba(91,201,248,0.12)',
        'glow-card': '0 0 40px rgba(91,201,248,0.06)',
      },
    },
  },
  plugins: [],
};
