import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        host: 'localhost',
        https: {
            key: readFileSync('/home/zerowo/.cert/localhost-key.pem'),
            cert: readFileSync('/home/zerowo/localhost.pem'),
        },
        proxy: {
            '/api/v1': {
                target: 'https://localhost:8443',
                changeOrigin: false,
                secure: false,
            },
        },
    },
    build: {
        assetsDir: 'static',
    },
})
