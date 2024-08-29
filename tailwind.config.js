/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "surface": '#1c1c1a',
        "on-surface": "#c4bdb3",
        "primary": "#0156cf",
      }
    }
  },
  plugins: []
};