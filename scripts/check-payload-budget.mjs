// TASK-M1-05: asserts the initial web payload against the budget proposed in
// ARCHITECTURE.md §7 / ASSET_PIPELINE.md §10 (NFR-WEB-01, ≤5 MB to first
// playable frame). Run after `npm run build`.
import { appendFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BUDGET_BYTES = 5 * 1024 * 1024;
const BUILD_DIR = "build";

function walk(dir) {
  let total = 0;
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = walk(full);
      total += sub.total;
      files.push(...sub.files);
    } else if (!entry.name.endsWith(".map")) {
      // Sourcemaps are dev tooling; a player's browser never downloads them.
      const size = statSync(full).size;
      total += size;
      files.push({ path: full, size });
    }
  }
  return { total, files };
}

const { total, files } = walk(BUILD_DIR);
const totalMb = (total / (1024 * 1024)).toFixed(2);
const budgetMb = (BUDGET_BYTES / (1024 * 1024)).toFixed(0);

console.log(`Initial web payload: ${totalMb} MB (budget: <= ${budgetMb} MB, NFR-WEB-01)`);
for (const file of files.sort((a, b) => b.size - a.size).slice(0, 10)) {
  console.log(`  ${(file.size / 1024).toFixed(1)} KB  ${file.path}`);
}

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  appendFileSync(
    summaryPath,
    `\n### Payload budget\n\n**${totalMb} MB** / ${budgetMb} MB budget (NFR-WEB-01)\n`,
  );
}

if (total > BUDGET_BYTES) {
  console.error(`Payload budget exceeded: ${totalMb} MB > ${budgetMb} MB`);
  process.exit(1);
}
