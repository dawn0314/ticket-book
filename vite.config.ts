import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@type": path.resolve(__dirname, "src/types"),
    },
  },
});
