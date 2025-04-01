import tailwindcss from 'tailwindcss';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from 'autoprefixer';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://backend:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
    },
    },
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
