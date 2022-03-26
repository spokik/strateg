const path = require("path");

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dynamicImport from "vite-plugin-dynamic-import";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // plugins: [vue(),viteCommonjs(), dynamicImport()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@m",
        replacement: path.resolve(__dirname, "node_modules/@pfm/map/src"),
      },
    ],
  },
});
