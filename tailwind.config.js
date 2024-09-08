/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                "surface": '#1c1c1a',
                "on-surface": "#F5FFFA",
                "primary": "#0156cf",
                "somethinf": "#E0DAA4"
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