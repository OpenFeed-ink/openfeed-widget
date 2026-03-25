import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig(({ mode }) => {
  const isCDN = mode === "cdn"

  return {
    plugins: [
      react(),
      tailwindcss(),
      !isCDN && dts({
        include: ["src"],
        outDir: "dist/npm",
        insertTypesEntry: true,
        staticImport: true,
        rollupTypes: false,
        tsconfigPath: "./tsconfig.build.json",
      }),
      visualizer({ open: true }),
    ].filter(Boolean),
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      cssCodeSplit: false,
      outDir: isCDN ? "dist/cdn" : "dist/npm",
      emptyOutDir: true,
      lib: {
        entry: "src/index.ts",
        name: "OpenFeedWidget",
        fileName: isCDN ? "widget" : "index",
        formats: isCDN ? ["iife"] : ["es"],
      },
      rollupOptions: isCDN ? {} : {
        external: (id) =>
          id === "react" ||
          id === "react-dom" ||
          id.startsWith("react/") ||
          id.startsWith("react-dom/"),
        output: {
          banner: '"use client";',
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "ReactJSXRuntime",
            "react-dom/client": "ReactDOMClient",
          },
        },
      },
    },
  }
})
