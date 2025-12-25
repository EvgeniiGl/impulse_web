import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';
export default defineConfig({
    plugins: [
        react(),
        svgr(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@components': path.resolve(__dirname, './src/components'),
            '@UI': path.resolve(__dirname, './src/UI'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@base': path.resolve(__dirname, './src/base'),
        },
    },
    root: path.join(__dirname, "src"),
    // base: process.env.APP_ENV === 'development'
    //     ? path.join(__dirname, "/")
    //     : path.join(__dirname, "dist"),
    build: {
        outDir: path.join(__dirname, "../public/bundle"),
        emptyOutDir: true,
        manifest: true,
        sourcemap: true,
        rollupOptions: {
            input: path.resolve(__dirname, 'src/main.tsx'),
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name].js",
                assetFileNames: "[name].[ext]",
            }
        }
    }
});
