
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'https://api.fashn.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      host:"0.0.0.0",
      port:5173
    },
    
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
