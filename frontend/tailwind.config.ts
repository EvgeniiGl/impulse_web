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
                sans: ['Inter', 'system-ui', 'sans-serif'], // для основного текста
            },
        },
    },
    plugins: [],
}