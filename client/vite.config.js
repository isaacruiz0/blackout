// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        careers: resolve(__dirname, "src/pages/careers.html"),
        home: resolve(__dirname, "src/pages/home.html"),
        quote: resolve(__dirname, "src/pages/quote.html"),
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001/",
        changeOrigin: true,
      },
    },
  },
});
