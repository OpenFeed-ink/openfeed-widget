import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "src/mount.tsx",
      name: "OpenFeedWidget",
      fileName: "widget",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "widget.[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
