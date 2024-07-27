import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [react(), wasm()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false, // Optional: Based on your project's needs
  },
});
