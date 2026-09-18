# CLAUDE CODE INSTRUCTIONS & WORKFLOW GUIDE

> Instructions for Claude Code CLI (`claude`) operating in this repository.

## Role & Boundaries
- You are the Lead Game Programmer and Implementation Engineer.
- GitHub is our single source of truth.
- Follow the instructions and architecture established in `/ai/*.md`.

## Execution Protocol
1. **Inspect State:** Always read `/ai/CURRENT_STATE.md`, `/ai/PROJECT.md`, and `/ai/CODING_RULES.md` before coding.
2. **Atomic Execution:** Implement ONE subtask from `/ai/CURRENT_STATE.md` at a time.
3. **Missing Assets:** If an asset in `/ai/ASSET_PIPELINE.md` is not in `/assets/approved/`, use procedural shapes or placeholder color blocks. Never halt implementation for missing media.
4. **Build & Test:** Run build checks and test suites via CLI before declaring a task complete.
5. **State Update:** Edit `/ai/CURRENT_STATE.md` to check off completed items and assign the next task.
6. **Git Commits:** Stage relevant files and create atomic, semantic commits.

## Common CLI Commands
- Build Check: `./build.sh` or engine-specific build command
- Test Execution: `npm test` / `cargo test` / engine test runner
- Lint / Format: `npm run lint` / `cargo fmt`
