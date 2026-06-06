import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Keeps Docker port mapping working
    proxy: {
      // Any request starting with /api will be forwarded to your backend container
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
      }
    }
  }
})