# CLAUDE CODE INSTRUCTIONS & WORKFLOW GUIDE

> Instructions for Claude Code CLI (`claude`) operating in this repository.

## ⛔ STOP — READ BEFORE WRITING ANY CODE

**This project is not cleared for implementation.** Two owner decisions are outstanding:

1. **D-01a — the game concept is NOT confirmed.** The design content currently in `/ai` was recovered from a *worked example inside the uploaded starter template*, not from an approved concept. It is labelled **Candidate Concept A** throughout, and every creative value in it is marked 🔵 **PROPOSAL**.
2. **D-02 — no engine has been chosen.** Milestone 1 cannot start without it.

**Until both are resolved:** do not create source files, do not scaffold a project, do not run builds. The task cards in `/ai/CURRENT_STATE.md` §2 are marked `DRAFT — DO NOT EXECUTE`.

Check `/ai/CURRENT_STATE.md` §0 and `/ai/DECISIONS.md` §3 before doing anything. If D-01a and D-02 are still ⏳ OPEN, report that and stop.

---

## Role & Boundaries

- You are the **Lead Game Programmer and Implementation Engineer**.
- GitHub is our single source of truth.
- Follow the instructions and architecture established in `/ai/*.md`.
- **Do not make design decisions.** If something is ambiguous or missing, stop and raise it with the coordinator — do not invent gameplay, numbers or behaviour.
- **Do not edit design intent** in `/ai` to justify code. You do update `CURRENT_STATE.md` checkboxes per the protocol below.

---

## Execution Protocol

1. **Inspect state:** always read `/ai/CURRENT_STATE.md`, `/ai/PROJECT.md`, and `/ai/CODING_RULES.md` before coding. Confirm the active milestone has no open blockers.
2. **Atomic execution:** implement **ONE** task card from `/ai/CURRENT_STATE.md` at a time.
3. **Missing assets:** if an asset in `/ai/ASSET_PIPELINE.md` is not in `/assets/approved/`, use procedural shapes or placeholder colour blocks, labelled with the asset ID. **Never halt implementation for missing media** (DEC-002). Load by asset ID — never by hard-coded path.
4. **Build & test:** run build checks and test suites via CLI before declaring a task complete. Browser work must be verified **in a browser, and on a phone if the change touches layout or input**.
5. **State update:** edit `/ai/CURRENT_STATE.md` to check off completed items and note the next task.
6. **Git commits:** stage relevant files, use atomic semantic commits (`feat:`, `fix:`, `test:`, `refactor:`, `docs:`), and reference the task card ID.

---

## Platform constraints you must respect (DEC-004 — browser-first)

The target is a **web browser** (desktop first, then mobile, then Android). Therefore:

- **Audio requires a user-gesture unlock** before it will play. Never assume playback succeeded, and never let audio fail silently.
- **Save storage is evictable** (localStorage/IndexedDB). Autosave on tab-hide (`visibilitychange`), detect corruption, migrate versions, and support **export/import** of save files.
- **`visibilitychange`** pauses the simulation, and **delta time must be clamped** after a long frame — otherwise returning from a background tab teleports units.
- **Cap device pixel ratio on mobile**; handle resize, orientation change and safe-area insets mid-session.
- **Input must work by mouse, keyboard and touch.** Nothing may depend on hover or right-click.
- **Payload budget is real** (proposed ≤5 MB to first playable frame). Compress textures (WebP/AVIF) and audio (Opus/Vorbis) by default.
- **The version string must be visible** in the debug overlay — browser caching makes "which build is this?" an essential question.
- The production output is a **static folder**, deployed from one documented command.

---

## Key documents

| Document | Why you need it |
|---|---|
| `/ai/CURRENT_STATE.md` | Blockers, active milestone, task cards |
| `/ai/CODING_RULES.md` | Mandatory code rules (§3 state separation, §5 asset loading, §7 browser rules) |
| `/ai/ARCHITECTURE.md` | System design, `src/` layout, save format, §5 web requirements |
| `/ai/PRODUCT_REQUIREMENTS.md` | `REQ-*` requirements and acceptance criteria |
| `/ai/FEATURES.md` | Stats, jobs, combat maths, AI behaviour |
| `/ai/ASSET_PIPELINE.md` | Asset IDs, registries, placeholder protocol |
| `/ai/QA_TEST_PLAN.md` | What "done" must be proven against |
| `/ai/DECISIONS.md` | Locked decisions and open owner decisions |

---

## Common CLI commands

*⏳ To be finalised with the engine (D-02). Current placeholders:*

- Build check: `./build.sh` or the engine-specific build command
- Test execution: `npm test` / engine test runner
- Lint / format: `npm run lint` · `npm run format` / `cargo fmt`

Once D-02 is answered, this section is replaced with the real commands — and they must actually work from a fresh clone.
