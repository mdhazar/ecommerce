import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["redux-thunk"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "./src"
      ),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.tsx"),
      },
    },
  },
});
