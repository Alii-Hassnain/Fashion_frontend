// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from "path"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// // server:{
// //   "host":"0.0.0.0",
// // },
// //  proxy:{
// //   '/api':{
// //     target:'http://localhost:8080',
// //     changeOrigin:true, 
// //     rewrite:(path)=>path.replace(/^\/api/,'')
// //   }}
// //   server: {
// //   proxy: {
// //     '/api': {
// //       target: 'https://api.fashn.ai',
// //       changeOrigin: true,
// //       rewrite: (path) => path.replace(/^\/api/, ''),
// //     },
// //   },
// // },
  
// })


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
    },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
