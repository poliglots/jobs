import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/jobs/",
  build: {
    outDir: "../dist",
    emptyOutDir: false, // This line prevents the output directory from being emptied
  },
});
