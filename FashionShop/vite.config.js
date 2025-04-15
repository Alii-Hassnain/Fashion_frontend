
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'ceea-2400-adc7-4101-3200-c1a5-f99-2afa-8b80.ngrok-free.app'
    ],
      proxy: {
        '/api': {
          target: 'https://api.fashn.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
