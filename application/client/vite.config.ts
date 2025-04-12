import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  //@ts-expect-error missing typings ?
  plugins: [deno(), react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace("/api", ""),
  //     },
  //   },
  // },
});
