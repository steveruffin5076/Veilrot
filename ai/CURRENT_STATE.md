# CURRENT STATE & LIVE TASK TRACKER

> **Active Milestone:** `Milestone 1: Technical Foundation & Scaffolding` — ⚠️ **BLOCKED on D-02 (engine)**
> **Last Updated:** 2026-09-18
> **Build Status:** `NOT STARTED` (no source code exists yet)
> **Maintained By:** Cursor AI / Claude Code / Claude Cowork
> **Read this first.** It is the single answer to "where are we?"

---

## 0. ⛔ READ THIS BEFORE ANY CODE IS WRITTEN

**Two things are unresolved, and both are the owner's to decide:**

1. **The game concept is not confirmed.** The file uploaded to `main` (commit `259a51c`) is the *Autonomous Game Development Starter Template*, not a concept document. Its `/ai` files contained a fully worked **example** — an isometric tactical RPG — which has been recovered and structured in this documentation set as **Candidate Concept A**. It is **not approved**. See **D-01a** in `DECISIONS.md`.
2. **The engine is not chosen** (**D-02**). No task card may be issued until it is.

**Therefore: the task cards in §2 below are carried forward from the template as a *plan*, not as an instruction to build.** They become live the moment D-01a and D-02 are answered.

---

## 1. Milestone Status Summary

- **Target:** Complete Milestone 1 — Technical Foundation & Scaffolding
- **Progress:** 0% (0 / 4 tasks)
- **Blockers:** 🔴 D-01a (concept not confirmed) · 🔴 D-02 (engine not chosen)
- **Pending assets:** procedural placeholders will be active for unit sprites and grid tiles — **non-blocking** (DEC-002)

---

## 2. Active Implementation Task Cards

> **Status: `DRAFT — DO NOT EXECUTE`** until D-01a and D-02 are resolved. File paths assume a TypeScript-style project (the recommended Phaser option); they will be rewritten for the chosen engine.

### [ ] TASK-M1-01: Engine Bootstrap & Scene Manager
- **Priority:** High
- **Relevant files:** `src/core/main.ts`, `src/core/SceneManager.ts`
- **What to build:** Main entry point; canvas sizing (1280×720 internal, scaled to fit, DPR-capped on mobile); 60 FPS fixed-step update loop; SceneManager supporting `TitleScene` and `BattleScene`; the **audio-unlock gate**; debug overlay (fps, frame time, build version).
- **Dependencies:** none. **Requires D-02 first.**
- **Acceptance criteria:** the game launches in a browser tab, renders a background, transitions between scenes, logs the transition, shows the debug overlay, and runs from a static build served over HTTPS.
- **Added by DEC-004:** the build must be produced by one documented command and must open on a phone.

### [ ] TASK-M1-02: Grid Representation & Tile Coordinate Mapping
- **Priority:** High
- **Relevant files:** `src/grid/GridManager.ts`, `src/grid/Tile.ts`, `src/grid/IsoMath.ts`
- **What to build:** 2D data model for a 10×10 grid; each tile stores `{ x, y, elevation, terrain_type, is_walkable }`; isometric rendering of tiles with distinguishable elevation tiers (0, 1, 2); terrain and stat data loaded from `data/`.
- **Dependencies:** TASK-M1-01.
- **Acceptance criteria:** a 10×10 grid renders with visible elevation differences; a unit test proves world↔grid coordinate conversion round-trips exactly.

### [ ] TASK-M1-03: Tile Cursor & Input Navigation
- **Priority:** Medium
- **Relevant files:** `src/core/InputHandler.ts`, `src/grid/TileCursor.ts`
- **What to build:** mouse-hover and keyboard (WASD/arrows) tile navigation, **plus touch tap-to-select**; hovered tile highlighted with a coloured border; selected tile coordinates emitted on the EventBus.
- **Dependencies:** TASK-M1-02.
- **Acceptance criteria:** mouse, keyboard **and touch** each move the cursor over valid tiles and report coordinates; no interaction requires hover.

### [ ] TASK-M1-04: Basic Unit Entity & Grid Placement
- **Priority:** Medium
- **Relevant files:** `src/entities/UnitEntity.ts`, `src/entities/StatsComponent.ts`
- **What to build:** `UnitEntity` with grid position `(x, y)`, facing direction and base stats; render **obvious procedural placeholders** (not final art) on tile `(2,2)` for the hero and `(7,7)` for the enemy; assets resolved through the `AssetManager` by ID with a missing-asset fallback.
- **Dependencies:** TASK-M1-03.
- **Acceptance criteria:** two placeholder units render at the correct tile positions and layer correctly over terrain; removing the asset files still renders placeholders without a crash.

### [ ] TASK-M1-05 *(added by the agent — DEC-004)*: Web Build & Delivery Pipeline
- **Priority:** High
- **Relevant files:** build config, `public/` shell, CI workflow
- **What to build:** one command producing a static build folder; HTTPS-served local preview; debuggable version string; a CI job that runs the smoke test and asserts the payload budget.
- **Dependencies:** TASK-M1-01.
- **Acceptance criteria:** fresh clone → one command → the game is playable in a browser on a phone on the same network; the payload budget is reported in CI.

---

## 3. Next Recommended Implementation Task

👉 **TASK-M1-01: Engine Bootstrap & Scene Manager** — **once D-02 is answered.**

Before that, the owner should answer **D-01a** (is the tactical RPG the game?).

---

## 4. Completed Work Archive

*(Tasks move here as the implementer completes and verifies them.)*

- None yet — no source code exists.

---

## 5. Blockers

| ID | Blocker | Severity | Impact | Resolution |
|---|---|---|---|---|
| **B-01** | **Game concept not confirmed (D-01a)** | 🔴 Critical | Blocks all design commitment and implementation | Owner confirms or replaces Candidate Concept A |
| **B-02** | **Engine not chosen (D-02)** | 🔴 Critical | Blocks M1, architecture, CI, asset import | Owner picks from the shortlist in `ARCHITECTURE.md` §1.2 |
| **B-03** | Scope ceiling unresolved (D-09) — template's `PROJECT.md` says 8 jobs/15 levels, its `MILESTONES.md` says 4/5 | 🟠 High | Blocks content volume, M4 sizing, timeline | Owner sets one number |
| ~~B-04~~ | ~~Platform not chosen~~ | — | — | ✅ **Resolved — DEC-004 (browser-first)** |

---

## 6. Missing Assets

**None required yet** — the project has no code and no approved art direction (**D-08**).

The asset system is ready: the 10-point spec schema, three registries in `ASSET_PIPELINE.md` (characters, environments, UI/audio), the approval workflow, and the mock-placeholder protocol.

**Standing rule (DEC-002):** missing art never blocks development. Code loads by asset ID and substitutes an obvious placeholder; real art integrates later with no code change.

---

## 7. Documentation Status

| Document | Status |
|---|---|
| `PROJECT.md` | 🔵 Candidate Concept A recorded, provisional; concept provenance flagged |
| `PRODUCT_REQUIREMENTS.md` | 🔵 Loop, `REQ-*` requirements, NFRs, MVP criteria — all provisional |
| `UX_UI.md` | 🔵 Screen flow, HUD, tokens adopted; accessibility conflict flagged |
| `ARCHITECTURE.md` | 🔵 Systems design adopted; engine ⏳ OPEN |
| `FEATURES.md` | 🔵 Stats, jobs, AI adopted; specification gaps listed |
| `MILESTONES.md` | ✅ Structure solid; M4 content ⏳ OPEN |
| `CURRENT_STATE.md` | ✅ This file |
| `DECISIONS.md` | ✅ 4 decisions logged (3 from template + DEC-004 platform); 16 blocking owner decisions registered |
| `CODING_RULES.md` | ✅ Mandatory rules ready |
| `QA_TEST_PLAN.md` | 🔵 Framework + web obligations ready; case content pending |
| `ASSET_PIPELINE.md` | 🔵 Schema + registries ready; style ⏳ OPEN |
| `CLAUDE.md` / `.cursorrules` | ✅ Runtime instructions for the implementer |

---

## 8. Next Recommended Action

> ### 1. Answer **D-01a**: is the isometric tactical RPG (Candidate Concept A) your game?
> - **Yes** → the concept locks and all 🔵 PROPOSAL markers can be resolved.
> - **No / different** → send the real concept; the framework, conventions, web requirements and asset pipeline all survive the change.
>
> ### 2. Answer **D-02**: engine.
> - **Phaser 4 + TypeScript** — recommended (native isometric tilemap support, sub-second loads, best mobile-web fit).
> - **Godot 4** — if a visual editor matters more than load time.
>
> ### 3. Then answer **D-09** (scope ceiling) so the milestone plan and timeline can be finalised.
>
> On those three answers the coordinator will: resolve every remaining ⏳/🔵 marker into approved content, close the specification gaps listed in `FEATURES.md` §5, issue the final M1 task cards, and produce a timeline with assumptions stated.

---

## 9. Metrics

| Metric | Value |
|---|---|
| Milestones complete | 0 / 6 |
| Locked decisions | 4 (DEC-001 separation of concerns, DEC-002 missing art, DEC-003 height advantage *(provisional)*, DEC-004 platform) |
| Open blocking decisions | 3 critical/high (D-01a concept, D-02 engine, D-09 scope) + 13 further ⏳ |
| Requirements written | ~30 `REQ-*` + 9 web NFRs + 7 platform NFRs *(all 🔵 provisional)* |
| Task cards written | 5 draft (M1) — **none executable** |
| Assets specified | 13 *(all 🔵, none produced)* |
| Automated tests passing | 0 (no code yet) |

---

## 10. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Dashboard created. Project state: intake blocked pending owner's concept document. | Agent |
| 2026-09-18 | **DEC-004 recorded (browser-first)**; engine shortlist re-scoped for web. | Agent |
| 2026-09-18 | **Merged with the uploaded starter template.** Adopted the template's task-card format and its four M1 cards (retained as `DRAFT — DO NOT EXECUTE`); added `TASK-M1-05` for the web build pipeline; blocked all execution on D-01a and D-02; recorded the template's concept as **Candidate Concept A**; logged the scope conflict (B-03). | Agent |
