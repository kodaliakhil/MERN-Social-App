import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // to get rid of cors error
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: false,
        secure: false,
      },
    },
  },
});
