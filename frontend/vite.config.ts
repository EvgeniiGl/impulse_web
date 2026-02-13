import react from '@vitejs/plugin-react-swc'
import {defineConfig, loadEnv} from 'vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({mode}) => {
    // Загружаем env переменные
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            react(),
            svgr(),
            tailwindcss(),
        ],
        envDir: process.cwd(),
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@modules': path.resolve(__dirname, './src/modules'),
                '@components': path.resolve(__dirname, './src/components'),
                '@ui': path.resolve(__dirname, './src/ui'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@base': path.resolve(__dirname, './src/base'),
                '@store': path.resolve(__dirname, './src/store'),
                '@hooks': path.resolve(__dirname, './src/hooks'),
                '@api': path.resolve(__dirname, './src/api'),
                '@types': path.resolve(__dirname, './src/types'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@features': path.resolve(__dirname, './src/features'),
            },
        },
        root: path.join(__dirname, "src"),
        base: env.VITE_APP_ENV === 'development' ? '/' : '/dist/',
        build: {
            outDir: path.join(__dirname, "../public/bundle"),
            emptyOutDir: true,
            manifest: true,
            sourcemap: true,
            rollupOptions: {
                input: path.resolve(__dirname, 'src/main.tsx'),
                output: {
                    entryFileNames: '[name].js',
                    chunkFileNames: '[name].js',
                    assetFileNames: '[name].[ext]',
                }
            }
        }
    }
})
