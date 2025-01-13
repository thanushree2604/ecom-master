import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ecom-backend-six-xi.vercel.app',
        // target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
