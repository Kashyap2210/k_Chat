// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/k_Chat/", // <-- Update with your repository name
  plugins: [react()],
});
