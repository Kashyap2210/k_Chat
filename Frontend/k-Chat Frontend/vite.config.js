import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/k_Chat/", // Ensure this matches the repository name
  plugins: [react()],
});
