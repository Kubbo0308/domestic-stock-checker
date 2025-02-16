import tailwindcss from 'tailwindcss';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from 'autoprefixer';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
