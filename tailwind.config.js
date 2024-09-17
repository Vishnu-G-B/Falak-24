/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                "surface": '#1c1c1a',
                "on-surface": "#F5FFFA",
                "primary": "#0156cf",
                "kahki": "#BEB7A4",
                "dark-cyan": "#2D898B",
                "persian-green": "#549F93",
                "amarnath-pink": "#DDA3B2",
                "error": '#ffb4ab',
                "on-error": '#690005',
            },
            fontFamily: {
                tripSans: ["TripSans", "sans-serif"],
                canopee: ["canopee", "sans-serif"],
                PPE: ["PPEditorial", "sans-serif"],
            }
        }
    },
    plugins: []
};