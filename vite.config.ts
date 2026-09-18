import { defineConfig } from "vitest/config";
import { readFileSync } from "node:fs";
import basicSsl from "@vitejs/plugin-basic-ssl";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8")) as {
  version: string;
};

// TASK-M1-05 / DEC-004: local dev/preview is served over HTTPS so phone testing
// on the same network behaves like the real deployment (secure-context APIs,
// no mixed-content surprises). Skipped in CI: the self-signed cert would just
// add ignoreHTTPSErrors ceremony to the smoke test for no benefit there.
const isCi = process.env.CI === "true";

export default defineConfig({
  base: "./",
  plugins: isCi ? [] : [basicSsl()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    target: "es2022",
    outDir: "build",
    assetsDir: "assets",
    sourcemap: true,
  },
  server: {
    host: true,
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
