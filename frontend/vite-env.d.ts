// src/vite-env.d.ts или src/types/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_APP_ENV: 'development' | 'production'
    readonly VITE_DEBUG: string
    readonly VITE_APP_NAME: string
    // добавьте все ваши переменные окружения здесь
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}