import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

export default defineConfig({
    plugins: [
        react({
            // Только для компиляции, без dev server
            jsxRuntime: 'automatic',
        }),
    ],

    server: undefined,
    preview: undefined,
    build: {
        manifest: true,
        emptyOutDir: true,
        outDir: './../public/dist',
        sourcemap: true, // опционально

        // Собираем бандл из TypeScript
        lib: {
            entry: resolve(__dirname, 'src/main.tsx'),
            name: 'App',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
})