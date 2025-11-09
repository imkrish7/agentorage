import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
     tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "single"
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias '@' to the 'src' directory
      // Add more aliases as needed, e.g.:
      // '@components': path.resolve(__dirname, './src/components'),
      // '@assets': path.resolve(__dirname, './src/assets'),
    },
  }
})


