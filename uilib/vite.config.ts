import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        theme: resolve(__dirname, "src/theme/theme.css"),
      },
      formats: ["es"],
      fileName: "index",
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ["vue"],
    },
  },
});
