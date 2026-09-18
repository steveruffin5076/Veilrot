# CURRENT STATE & LIVE TASK TRACKER

> **Active Milestone:** `Milestone 1: Technical Foundation & Scaffolding` — ✅ **UNBLOCKED — D-01a and D-02 both resolved**
> **Last Updated:** 2026-09-18
> **Build Status:** `NOT STARTED` (no source code exists yet)
> **Maintained By:** Cursor AI / Claude Code / Claude Cowork
> **Read this first.** It is the single answer to "where are we?"

---

## 0. ✅ BOTH LAUNCH BLOCKERS RESOLVED

1. **Game concept — CONFIRMED.** Owner confirmed **Candidate Concept A** (isometric tactical RPG) as Veilrot's game. See **DEC-006** in `DECISIONS.md`.
2. **Engine — CHOSEN.** **Phaser 4 + TypeScript**. See **DEC-005** in `DECISIONS.md`.

**The task cards in §2 below are now live and may be implemented**, one at a time, per `CLAUDE.md` execution protocol. Individual 🔵 PROPOSAL markers on specific creative numbers elsewhere in `/ai` (exact stat values, art style, etc.) are unaffected by this and remain the coordinator's to resolve — implement task cards against what is written, and raise anything genuinely ambiguous rather than inventing it (`CODING_RULES.md` law #2).

---

## 1. Milestone Status Summary

- **Target:** Complete Milestone 1 — Technical Foundation & Scaffolding
- **Progress:** 60% (3 / 5 tasks)
- **Blockers:** none — ~~D-01a~~ ✅ resolved (DEC-006, Candidate Concept A) · ~~D-02~~ ✅ resolved (DEC-005, Phaser 4 + TypeScript)
- **Pending assets:** procedural placeholders will be active for unit sprites and grid tiles — **non-blocking** (DEC-002)

---

## 2. Active Implementation Task Cards

> **Status: `LIVE — READY FOR IMPLEMENTATION`.** D-01a and D-02 are both resolved. File paths assume a TypeScript-style project (Phaser), which matches the chosen engine.

### [x] TASK-M1-01: Engine Bootstrap & Scene Manager — ✅ DONE (2026-09-18)
- **Priority:** High
- **Relevant files:** `src/core/main.ts`, `src/core/SceneManager.ts`, `src/core/scenes/TitleScene.ts`, `src/core/scenes/BattleScene.ts`, `src/core/GameConfig.ts`, `src/core/EventBus.ts`, `src/core/DebugOverlay.ts`, `src/platform/AudioUnlockGate.ts`, `src/utils/FixedTimestep.ts`, plus `package.json`/`vite.config.ts`/`tsconfig.json` project scaffold.
- **What was built:** Vite + TypeScript + Phaser 4.2.1 project scaffold; main entry point; canvas at 1280×720 internal, `Phaser.Scale.FIT` + `CENTER_BOTH`; `SceneManager` singleton logging every transition to console + `EventBus`; `TitleScene` → `BattleScene` transition on click/tap/keypress; audio-unlock gate (`AudioUnlockGate`) wired to the title-screen gesture; DOM debug overlay (fps, frame time, version, active scene), toggled with backtick, on by default in dev; fixed-timestep accumulator (`FixedTimestep`, 60 Hz, capped at 5 steps/frame per DEC-004's tab-hide teleport rule) driving `BattleScene.update`; `visibilitychange` pauses/resumes `game.loop`.
- **Placeholders used (DEC-002):** flat-colour rectangles labelled `[PLACEHOLDER bg_title_001]` / `[PLACEHOLDER bg_battle_grid_001]` — no approved art exists yet.
- **Engine-reality note for the coordinator:** ARCHITECTURE.md §5.3 describes DPR-capping as a `resolution` config value (Phaser 3 API). Phaser 4.2.1 removed that option — its ScaleManager always renders at the fixed configured `width`/`height` and only CSS-scales for display (verified against the installed package's own docs, `node_modules/phaser/skills/scale-and-responsive/SKILL.md`), so the "cap DPR on mobile" requirement is satisfied by construction rather than by a config value. Flagging so the doc's wording can be updated; no design intent was changed.
- **Verified:** `npm run typecheck`, `npm test` (5/5 unit tests on `FixedTimestep`), `npm run lint`, `npm run build` all pass. Manually verified in headless Chromium at a desktop viewport (1280×800) and a phone viewport (390×844, touch, 3x DPR, iPhone-sized) via Playwright: title renders, tap transitions to `BattleScene`, transition is logged, debug overlay shows fps/frame-time/version/scene, letterboxing on the phone viewport is correct, zero page errors. Static production build (`npm run build && npm run preview`) served and returned 200.
- **Acceptance criteria:** met — game launches in a browser tab, renders a background, transitions between scenes, logs the transition, shows the debug overlay, runs from a static build.

### [x] TASK-M1-02: Grid Representation & Tile Coordinate Mapping — ✅ DONE (2026-09-18)
- **Priority:** High
- **Relevant files:** `src/grid/GridManager.ts`, `src/grid/Tile.ts`, `src/grid/IsoMath.ts`, `src/utils/IsoBlockGeometry.ts`, `src/utils/Color.ts`, `src/data/tile_config.json`, `src/data/battlefield_demo_m1.json`, `src/core/scenes/BattleScene.ts`.
- **What was built:** `Tile` data type (`x, y, elevation, terrainType, isWalkable, occupantId`) and a `TerrainType` union (`grass`/`stone`/`water`, named after the assets already specified in `ASSET_PIPELINE.md` §6 — no movement-cost/defence values attached, since that table is still an open spec gap, `FEATURES.md` §5 gap #2). `GridManager` loads a full 10×10 grid from `src/data/battlefield_demo_m1.json` (validates bounds + completeness), exposes `getTile`, `allTiles`, and `tilesInDrawOrder` (painter's-algorithm depth sort). `IsoMath` is the single world↔grid conversion module (`gridToWorld`/`worldToGrid`, exact inverses at the 64×32px tile size from `ASSET_PIPELINE.md` §6, plus a separate `elevationOffsetPx` for rendering only). `BattleScene` renders the grid as isometric "height blocks" (top diamond + two shaded side faces per tile) via the pure, headless-testable `buildIsoTileBlockFaces` + `darken` helpers — elevation 0/1/2 get visibly distinct placeholder colours (DEC-002; no approved height-block art yet per `ASSET_PIPELINE.md` §6).
- **Demo layout:** `battlefield_demo_m1.json` (generated, not hand-typed) is a uniform grass floor with a raised 4×4 plateau (elevation 1 ring, elevation 2 core) purely to make elevation tiers visible — a tech-demo fixture, not level design.
- **Verified:** `npm run typecheck`, `npm test` (21/21 — `IsoMath` round-trip over the full 10×10 grid, `GridManager` bounds/validation/draw-order, `Color.darken`, `IsoBlockGeometry`), `npm run lint`, `npm run build` all pass. Manually verified in headless Chromium at desktop and phone viewports: the grid renders as a clean isometric diamond with a clearly raised 2-tier plateau, correct letterboxing on the phone viewport, debug overlay still live, zero console/page errors.
- **Acceptance criteria:** met — 10×10 grid renders with visible elevation differences; `IsoMath` round-trip is exact (bit-exact `toBe` assertions, not approximate) for every one of the 100 grid coordinates.

### [x] TASK-M1-03: Tile Cursor & Input Navigation — ✅ DONE (2026-09-18)
- **Priority:** Medium
- **Relevant files:** `src/core/InputHandler.ts`, `src/grid/TileCursor.ts`, `src/core/EventBus.ts`, `src/core/scenes/BattleScene.ts`, `src/core/DebugOverlay.ts`, `src/core/main.ts`.
- **What was built:** `TileCursor` — pure, bounds-clamped cursor-position state (`moveBy`/`moveTo`), headless-testable, no input/rendering coupling. `InputHandler` wires Phaser's unified pointer events (mouse **and** touch both arrive as `pointermove`/`pointerdown`) plus a global `keydown` listener (WASD + arrow keys to move, Enter/Space to confirm) to a `TileCursor`, and emits two new typed `EventBus` events: `tileHover` (every cursor move) and `tileSelected` (click, tap, or Enter/Space). Picking converts the pointer position through `IsoMath.worldToGrid` on the ground plane (elevation is render-only there by design, per TASK-M1-02) and validates against `GridManager`. `BattleScene` subscribes to both events (never reads `InputHandler` state directly) to draw a live yellow hover outline and a magenta selected outline, and logs each selection. The debug overlay now also shows `grid: (x,y)` (ARCHITECTURE.md §6 lists this as a required field, deferred until there was a grid).
- **"No interaction requires hover" (explicit acceptance requirement):** keyboard navigation operates purely on `TileCursor` state and works with the mouse never touched; a touch tap resolves and selects a tile directly in one `pointerdown`, with no prior hover step. Verified separately for each modality — see below.
- **Verified:** `npm run typecheck`, `npm test` (27/27 — added `TileCursor` bounds/clamping/delta tests), `npm run lint`, `npm run build` all pass. Manually verified in headless Chromium with three independent flows: (1) mouse-only — hover/click, correct highlight + `tileSelected` log; (2) **keyboard-only** — page never touched by the mouse at all, arrow-key navigation moved the cursor 5 tiles right + 3 down to the expected `(5,3)`, Enter selected it; (3) **touch-only** (real synthesized touch events, not mouse emulation) — a tap started the game and a second tap both moved the cursor and selected the tile (`(8,8)`) in one gesture, on a phone viewport with correct letterboxing. All three produced the expected `EventBus` `tileSelected` coordinates and zero console/page errors.
- **Acceptance criteria:** met — mouse, keyboard and touch each move the cursor over valid tiles and report coordinates via the debug overlay and console; no interaction depends on hover.

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

👉 **TASK-M1-04: Basic Unit Entity & Grid Placement** — ready to implement now.

---

## 4. Completed Work Archive

*(Tasks move here as the implementer completes and verifies them.)*

- **2026-09-18 — TASK-M1-01: Engine Bootstrap & Scene Manager.** Phaser 4 + TypeScript/Vite project scaffold; main entry point; `TitleScene`/`BattleScene` with logged transitions; audio-unlock gate; DOM debug overlay; fixed-timestep loop. See §2 above for full detail and verification notes.
- **2026-09-18 — TASK-M1-02: Grid Representation & Tile Coordinate Mapping.** `Tile`/`GridManager`/`IsoMath` data model and coordinate math; 10×10 demo battlefield loaded from `data/`; isometric height-block rendering with 3 distinct elevation tiers. See §2 above for full detail and verification notes.
- **2026-09-18 — TASK-M1-03: Tile Cursor & Input Navigation.** `TileCursor`/`InputHandler`; mouse-hover, keyboard (WASD/arrows) and touch tap-to-select tile navigation, none dependent on hover; `tileHover`/`tileSelected` EventBus events; debug overlay now shows grid coords. See §2 above for full detail and verification notes.

---

## 5. Blockers

| ID | Blocker | Severity | Impact | Resolution |
|---|---|---|---|---|
| ~~B-01~~ | ~~Game concept not confirmed (D-01a)~~ | — | — | ✅ **Resolved — DEC-006 (Candidate Concept A confirmed)** |
| ~~B-02~~ | ~~Engine not chosen (D-02)~~ | — | — | ✅ **Resolved — DEC-005 (Phaser 4 + TypeScript)** |
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
| 2026-09-18 | **D-02 resolved: owner chose Phaser 4 + TypeScript (DEC-005).** B-02 cleared. Task cards in §2 remain `DRAFT — DO NOT EXECUTE`: **D-01a (game concept) is still ⏳ OPEN** and is now the sole remaining blocker on Milestone 1. | Agent |
| 2026-09-18 | **D-01a resolved: owner confirmed Candidate Concept A (DEC-006).** B-01 cleared. Both launch blockers are now resolved — **Milestone 1 task cards are LIVE.** Beginning TASK-M1-01. | Agent |
| 2026-09-18 | **TASK-M1-01 complete.** Phaser 4 + TypeScript project scaffolded (Vite, strict TS, ESLint, Prettier, Vitest); engine bootstrap, scene manager, audio-unlock gate, debug overlay and fixed-timestep loop implemented and verified (typecheck/tests/lint/build green; manually verified in headless Chromium at desktop and phone viewports). Flagged a doc/engine-reality mismatch on DPR capping for the coordinator (Phaser 4 dropped the `resolution` config Phaser 3 had) — no design intent changed. Next: TASK-M1-02. | Agent |
| 2026-09-18 | **TASK-M1-02 complete.** Grid data model, `IsoMath` world↔grid conversion (exact round-trip, unit-tested over all 100 tiles), and isometric height-block rendering with 3 visually distinct elevation tiers, all verified (21/21 tests, typecheck/lint/build green, manually verified in headless Chromium including a phone viewport). Terrain movement-cost/defence values intentionally left unimplemented — still an open spec gap (`FEATURES.md` §5 gap #2). Next: TASK-M1-03. | Agent |
| 2026-09-18 | **TASK-M1-03 complete.** `TileCursor` + `InputHandler` deliver mouse/keyboard/touch tile navigation and selection over the EventBus, verified with three independent input-modality flows in headless Chromium (mouse, keyboard-only with the mouse never touched, and real synthesized touch taps) — all three matched their expected grid coordinates with zero errors. 27/27 tests, typecheck/lint/build green. Next: TASK-M1-04. | Agent |
