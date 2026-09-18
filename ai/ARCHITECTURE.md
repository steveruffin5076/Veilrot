# TECHNICAL & SYSTEM ARCHITECTURE

> **Status:** `DRAFT` — system design recovered from the template's worked example (Candidate Concept A); engine ⏳ OPEN
> **Last Updated:** 2026-09-18
> **Maintained By:** Claude Cowork / Arena.ai
> **Target Consumer:** Cursor AI / Claude Code

---

## 1. Engine / Technology Decision Support

> ⚠️ **Research for the owner, NOT a decision (D-02).** Scoped by **DEC-004**: browser-first, mobile browsers included. That makes **build size** and **mobile-web performance** first-class criteria.

### 1.1 Why build size decides this project

A browser player who waits 20 seconds to load has usually already left. Download size is a *design* constraint here, not a technical detail.

| Engine | Typical minimum web build | Time to first play (cold, 50 Mbps) | Verdict for this target |
|---|---|---|---|
| **Phaser 4** (TS) | ~200 KB – 2 MB | < 1 s | ✅ Best load; web-native (no export step) |
| **Defold** | < 2 MB gzipped | ~1 s | ✅ Smallest payloads; smaller ecosystem |
| **Godot 4** (GDScript) | 15–50 MB | 5–15 s+ | ⚠️ Workable but heavy; **web export is GDScript-only — C# does not export to web** |
| **Unity 6** (WebGL) | 30–200 MB+ | 10–60 s | ❌ Poor fit; weak mobile-web support |
| **Unreal 5** | Not practical in browsers | — | ❌ Ruled out by DEC-004 |

### 1.2 The shortlist for a browser-first tactical RPG

| Option | Case for it | Cost |
|---|---|---|
| **Phaser 4 + TypeScript** ⭐ *agent's lead recommendation* | Phaser's **built-in Tilemap API supports isometric maps natively** (orthogonal, isometric, hexagonal, staggered) — exactly the battlefield model this game needs. Sub-second loads, instant iteration (edit → refresh), deploys to any static host, best mobile-web performance. Small payload matters doubly on phones. | No visual editor — scenes composed in code. Weaker at 3D (irrelevant here). Asset tooling more manual. |
| **Godot 4** | Genuine **visual editor** (TileMapLayer + TileSet), strong 2D tooling, GDScript is pleasant for grid logic. `TileMapLayer` is the current node type (plain `TileMap` is deprecated since 4.3). | 15–50 MB builds → multi-second loads on mobile data. Requires a real loading screen and a payload strategy that Phaser simply does not need. GDScript-only for web. |
| **Defold** | Smallest builds in the industry. | Smaller community; Lua; fewer tactical-RPG references. |

**Agent's recommendation:** **Phaser 4 + TypeScript**, because the engine has first-class isometric tilemap support and imposes no download tax on a browser-first game. Choose **Godot 4** if a visual editor matters more than load time to how you want to work.

**⚠️ Consequence of choosing Godot:** the payload constraint moves into design — a mandatory progress-bar loading screen, a hard initial-payload budget, and probably per-stage asset streaming. Worth weighing before deciding.

### 1.3 Non-negotiable engine requirements (whichever is chosen)

Browser-first + mobile + isometric grid means the engine **must** provide: isometric tilemap/tile rendering · sprite animation with pixel-art filtering control · bitmap/webfont text rendering · WebAudio playback with an unlock path · browser storage persistence · canvas/window resizing with a scale policy · and a build that outputs a plain static folder.

---

## 2. High-Level Engine Architecture

*Recovered from the template's worked example. Adopted as the target shape for Candidate Concept A — 🔵 PROPOSAL, refine on approval of the concept.*

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           GAME APPLICATION ROOT                         │
│  ┌───────────────────────┐  ┌────────────────────┐  ┌────────────────┐  │
│  │     SCENE MANAGER     │  │   INPUT HANDLER    │  │  AUDIO MANAGER │  │
│  │ (Title, Battle, Menu) │  │ (Mouse, Touch, Pad)│  │  (BGM, SFX)    │  │
│  └───────────┬───────────┘  └─────────┬──────────┘  └────────────────┘  │
│              ▼                        ▼                                 │
│  ┌───────────────────────────────────────────────┐  ┌────────────────┐  │
│  │              BATTLE SYSTEM CONTROLLER         │  │   EVENT BUS    │  │
│  │  ┌───────────────┐ ┌──────────────┐ ┌──────┐  │  │ (Global Events)│  │
│  │  │ Grid System   │ │ Turn Manager │ │Combat│  │  └────────────────┘  │
│  │  │ (Pathfinding) │ │ (CT Queue)   │ │Engine│  │  ┌────────────────┐  │
│  │  └───────────────┘ └──────────────┘ └──────┘  │  │   DATA LAYER   │  │
│  └───────────────────────┬───────────────────────┘  │ (Save/Load, JSON)│ │
│                          ▼                          └────────────────┘  │
│  ┌───────────────────────────────────────────────┐  ┌────────────────┐  │
│  │               ENTITY LAYER (ECS / Nodes)      │  │ PLATFORM LAYER │  │
│  │ [Unit] → StatsComp, AnimationComp, SpriteComp,│  │ (web: storage, │  │
│  │          AIComp                               │  │  audio unlock) │  │
│  └───────────────────────────────────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Added by the browser target (DEC-004):** a **Platform Layer** (§5) that isolates every browser-specific behaviour — storage, audio unlock, visibility, resize/DPR — behind one interface, so gameplay code never touches browser APIs directly.

---

## 3. Core Subsystems

### 3.1 Grid & Pathfinding System
- **Grid Representation:** 2D array / dictionary of `Tile` structures:
  `Tile = { x: int, y: int, elevation: int, terrain_type: TerrainEnum, occupant_id: UnitID | null, is_walkable: bool }`
- **Pathfinding:** A\* search factoring movement cost and elevation jump limits (template's example: max jump 2 tiers — 🔵 to confirm).
- **Range calculation:** Manhattan distance / Dijkstra flood-fill for movement and attack bounds.
- **Isometric mapping:** world↔grid conversion lives in exactly one module (`grid/IsoMath`), never duplicated.

### 3.2 Turn Order — Charge Time (CT) Queue
- Units accumulate CT each tick from their `Speed` stat (`CT += Speed`).
- A unit whose `CT >= 100` claims the active turn.
- Costs in the template's example: Move-only 20 CT · Action-only 20 CT · Wait preserves 40 CT. 🔵 **These numbers are unapproved placeholders and must live in data files, not code.**

### 3.3 Event Bus / Signals
Strongly typed, decoupled events. The template's example set is a sound starting vocabulary:
`on_turn_started(unit)` · `on_unit_moved(unit, path)` · `on_attack_executed(attacker, target, result)` · `on_unit_defeated(unit)` · `on_battle_won()` / `on_battle_lost()`

**Rule:** no UI component reads gameplay state directly; it subscribes to events. This is what keeps the rendering layer replaceable.

### 3.4 Save & State Persistence
- Game state serialised to JSON: `{ version: 1, squad: [...], inventory: [...], campaign_progress: {...}, settings: {...} }`
- **Atomic writes** via `.tmp` staging so an interrupted write cannot corrupt the save.
- **Web-specific (DEC-004):** storage is browser storage and is **evictable**. Therefore: versioned migration path, corruption detection, and a **player-facing export/import save file** as both backup and support path.
- Save must be written on tab-hide (`visibilitychange`), not only on explicit save points.

---

## 4. Directory & File Conventions (Source Code)

Reconciled: the template's layout, plus the platform layer required by DEC-004.

```
src/
├── core/          # bootstrap, global constants, EventBus, SceneManager
├── platform/      # web: storage adapter, audio unlock, visibility, resize/DPR  ← DEC-004
├── data/          # static data (jobs.json, skills.json, items.json, tiles.json)
├── entities/      # UnitEntity, Hero, Enemy, StatsComponent
├── grid/          # GridManager, Tile, IsoMath, PathfindingAStar, RangeFinder
├── systems/       # BattleController, TurnQueueManager, CombatResolver
├── ui/            # HUDController, TurnTimelineUI, ActionMenuUI, DialogUI
└── utils/         # MathHelpers, Serializer, Logger
```

**Rule:** tunable gameplay values (damage coefficients, CT costs, stat ranges) live in `data/`, never inline in `src/`. Balancing must never require a code change.

---

## 5. Web-Platform Requirements (mandated by DEC-004)

*Browser facts, not preferences. Each one breaks the game if ignored, so they are designed for from Milestone 1 rather than discovered at release.*

### 5.1 Audio unlock
Browsers block audio until the player interacts with the page. The game **must** route first playback through an explicit "tap/click to start" gate on the title screen, and re-unlock on resume after the tab regains focus. Audio must never fail silently — silent sound reads as a broken game.

### 5.2 Persistence
- `localStorage` for small saves; IndexedDB for larger state; **treat both as evictable.**
- Export/import save file (see §3.4) — also the support path for corrupted saves.
- Handle first-run, missing and malformed saves as normal cases, never as crashes.
- Request persistent storage where available, and report the result honestly rather than promising permanence.

### 5.3 Canvas scaling, DPI and input
- Render at device pixel ratio but **cap it on mobile** (3× DPR phones are a silent performance tax).
- Fit to window with a letterbox/scale policy; handle **orientation change and resize mid-session** without losing state.
- Respect **safe areas** on notched phones — nothing interactive under notch or home-gesture zones.
- Pointer coordinates must be translated through the canvas transform; never assume 1 CSS px = 1 render px.
- Mouse **and** touch **and** keyboard **and** gamepad support, with prompt glyphs switching on input-device change.

### 5.4 Tab lifecycle
The page can be hidden, suspended or killed at any moment.
- Pause gameplay and stop simulation on `visibilitychange`.
- **Clamp delta time** after a long frame — returning from a background tab otherwise produces a multi-second delta that teleports units through walls.
- Autosave on hide where the design allows.

### 5.5 Payload & loading
- Set an **initial payload budget** before production (proposed ≤ 5 MB to first playable frame; NFR-13).
- Show a real progress indicator for anything over ~2 s.
- Compress textures (WebP/AVIF) and audio (Opus/Vorbis) as the default, not as an optimisation pass.

### 5.6 Deployment & caching
- The build is a folder of static files; one command must produce a deployable output.
- Content-hashed filenames + a service worker so updates are atomic — players must never run a half-updated build from cache.
- **Version string visible in UI/debug overlay** (NFR-22): browser caching makes "which build are you on?" an essential question.
- HTTPS mandatory (also required for TWA packaging — `DECISIONS.md` D-23).

### 5.7 Mobile performance floor
A turn-based grid game is comfortably within mobile browser budgets, but only if the basics are respected: no per-frame allocations, pooled objects, batched sprite draws, and **measurement on a real mid-range Android phone** — not a desktop emulator.

### 5.8 PWA
Web manifest + service worker make the game installable and offline-capable, and are a **prerequisite for Trusted Web Activity** packaging (`DECISIONS.md` D-23). Recommended from Milestone 3, mandatory before Android packaging.

---

## 6. Testing Hooks

- Game logic (damage, CT, pathfinding, serialisation) must be testable **headlessly**, with no rendering.
- All randomness through a single **seeded RNG service** — reproducible tests and reproducible bug reports.
- Debug overlay toggled by one flag: fps, frame time, build version, current grid coords, CT queue order.
- Debug overlay is stripped or hidden in release builds.

---

## 7. Performance Budgets

| Budget | Target |
|---|---|
| Frame rate | 60 FPS (NFR-01) |
| Frame time | ≤ 16.6 ms total; render ≤ 10 ms, logic ≤ 4 ms (NFR-02) |
| Battle scene load | ≤ 1.5 s (template NFR-LOAD-01) |
| Save serialisation | ≤ 50 ms with integrity checksum (template NFR-SAVE-01) |
| Initial web payload | ≤ 5 MB to first playable frame (NFR-13, proposed) |

---

## 8. Open decisions affecting architecture

| # | Decision | Blocks | Status |
|---|---|---|---|
| D-02 | **Engine** — Phaser 4 (recommended) vs Godot 4 | Everything technical, M1 | ⏳ OWNER |
| D-01a | Concept approval (Candidate Concept A) | All system design | ⏳ OWNER |
| D-09 | Scope ceiling (4 classes/5 stages vs 8/15) | Data volume, save shape, M4 | ⏳ OWNER |
| D-23 | Android packaging (TWA vs Capacitor) | Android path, Play timing | ⏳ OWNER |
| D-24 | Web distribution (itch.io / own domain / portals) | SDKs, file-size limits | ⏳ OWNER |
| D-25 | Mobile device floor | Perf budgets, test matrix | ⏳ OWNER |
| D-27 | Target framerate confirmation (60 FPS) | Perf budgets | 🔵 proposed |
| ~~D-03~~ | ~~Platform~~ | — | ✅ RESOLVED — DEC-004 browser-first |

---

## 9. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Initial architecture authored (engine options, layout, conventions) | Agent |
| 2026-09-18 | **Merged with the template's architecture document.** Preserved and adopted: the high-level system diagram (§2), Tile/CT/EventBus/save specifications (§3), and the `src/` conventions (§4). Added §5 web-platform requirements, §6 testing hooks, §7 budgets, and the Platform Layer in §2. Engine comparison rewritten for browser-first with **isometric tilemap support** as a selection criterion (Phaser supports isometric maps natively). | Agent |
