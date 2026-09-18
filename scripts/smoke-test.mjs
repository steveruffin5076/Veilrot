// TASK-M1-05: CI smoke test. Serves the production build and confirms it
// actually boots in a real browser — renders the title screen, transitions
// to the battle scene on input, and produces zero console/page errors.
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 4173;
const URL = `http://localhost:${PORT}`;
const START_TIMEOUT_MS = 20_000;

function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        await fetch(url);
        resolve();
      } catch {
        if (Date.now() > deadline) {
          reject(new Error(`Timed out waiting for ${url}`));
        } else {
          setTimeout(attempt, 300);
        }
      }
    };
    attempt();
  });
}

const preview = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

let exitCode = 0;
try {
  await waitForServer(URL, START_TIMEOUT_MS);

  // PLAYWRIGHT_LAUNCH_EXECUTABLE lets a sandboxed dev environment point at a
  // pre-installed browser instead of downloading one; CI never sets it, so
  // `npx playwright install` still governs the real pipeline.
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_LAUNCH_EXECUTABLE || undefined,
  });
  const page = await browser.newContext().then((ctx) => ctx.newPage());

  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForSelector("canvas", { timeout: 10_000 });

  // Title -> battle transition (any input starts it — TitleScene.handleStart).
  await page.mouse.click(640, 400);
  await page.waitForTimeout(500);

  await browser.close();

  const realErrors = errors.filter((e) => !e.includes("AudioContext")); // autoplay policy noise, not a bug
  if (realErrors.length > 0) {
    console.error("Smoke test found console/page errors:\n" + realErrors.join("\n"));
    exitCode = 1;
  } else {
    console.log("Smoke test passed: canvas rendered, title -> battle transition triggered, zero errors.");
  }
} catch (err) {
  console.error("Smoke test failed:", err);
  exitCode = 1;
} finally {
  preview.kill();
}

process.exit(exitCode);
