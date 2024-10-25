import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
    build: {
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom']
                }
            }
        },
        envDir: './',
        envFile: '.env.production',
    },
    envDir: './',
    envFiles: ['.env.development'],
    server: {
        port: 3939,
    },
})
