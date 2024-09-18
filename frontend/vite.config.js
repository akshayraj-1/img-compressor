import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envDir: './',
  envFiles: ['.env.development'],
  build: {
    envDir: './',
    envFile: '.env.production',
  },
  server: {
    port: 3939,
  },
})
