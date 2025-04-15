
// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// export default defineConfig({
//   plugins: [react()],
//   server: {
//       proxy: {
//         '/api': {
//           target: 'https://api.fashn.ai',
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//         },
//       },
//       host :true,
//       port: 5173,
//     },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })


import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: command === 'serve' ? {
    proxy: {
      '/api': {
        target: 'https://api.fashn.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true,
    port: 5173,
  } : undefined,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
}))
