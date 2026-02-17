export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // theme и plugins опциональны
    theme: {
        extend: {
            fontFamily: {
                comfortaa: ['Comfortaa', 'cursive'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
                'caveat': ['Caveat', 'cursive'],
                'pacifico': ['Pacifico', 'cursive'],
                'dancing': ['Dancing Script', 'cursive'],
                'marck': ['Marck Script', 'cursive'],
                'great-vibes': ['Great Vibes', 'cursive'],
                'cormorant': ['Cormorant', 'serif'],
            },
        },
    },
    plugins: [],
}