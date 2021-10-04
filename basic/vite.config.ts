import * as fs from "fs";
import * as path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";

const dir = "dist";
if (fs.existsSync(dir)) {
  fs.rmdirSync(dir, { recursive: true });
}

let root: string;
let port: number;
const { module = "" } = process.env;
switch (module) {
  case "web":
    root = "apps/web";
    port = 5000;
    break;
  case "admin":
    root = "apps/admin";
    port = 5500;
    break;
}

export default defineConfig({
  root,
  publicDir: path.resolve(__dirname, "basic-pnpm", "public"),
  plugins: [
    solidPlugin(),
    WindiCSS({
      scan: {
        fileExtensions: ["html", "js", "ts", "jsx", "tsx"],
      },
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    port
  }
});
