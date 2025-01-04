import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import  federation  from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json', // Path to your TypeScript configuration
      outDir: 'dist/types', // Output directory for .d.ts files
      insertTypesEntry: true, // Automatically insert a `types` field in package.json
    }),
    federation({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button"
      },
      shared: ["react", "react-dom"],
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    emptyOutDir: true
  },
  preview: {
    port: 3000,
    strictPort: true,
    cors: true
  }
})
