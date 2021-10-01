/* eslint-env node */

import { chrome } from "../../electron-vendors.config.json";
import { join } from "path";
import { builtinModules } from "module";

const PACKAGE_ROOT = __dirname;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  define: {
    "process.env": {},
  },
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      "/@/": join(PACKAGE_ROOT, "src") + "/",
    },
    extensions: [".json", ".ts", ".js", ".tsx"],
    fallback: {
      assert: require.resolve("assert/"), // don't forget  to install assert (npm i --save-dev assert)
    },
  },
  plugins: [],
  base: "",
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: "dist",
    assetsDir: ".",
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    rollupOptions: {
      external: [...builtinModules],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
};

export default config;
