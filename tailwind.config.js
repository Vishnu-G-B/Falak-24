/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "surface": '#c4bdb3',
        "on-surface": "#1c1c1a",
        "primary": "#0156cf",
      }
    }
  },
  plugins: []
};