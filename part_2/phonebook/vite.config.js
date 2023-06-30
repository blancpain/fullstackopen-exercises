import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    assetsDir: "static",
  },
  server: {
    proxy: {
      "/api/persons": "http://localhost:3001",
    },
  },
  plugins: [react()],
});
