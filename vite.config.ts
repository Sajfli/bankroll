import { defineConfig, loadEnv } from 'vite'
import { readFileSync } from 'fs'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
const config = ({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return defineConfig({
        plugins: [react(), eslint()],
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        server: {
            host: 'localhost',
            https: {
                key: readFileSync(env.VITE_CERT_KEY_LOCATION),
                cert: readFileSync(env.VITE_CERT_LOCATION),
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
}

export default config
