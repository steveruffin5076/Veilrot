# CURRENT STATE & LIVE TASK TRACKER

> **Active Milestone:** `Milestone 1: Technical Foundation & Scaffolding`  
> **Last Updated:** YYYY-MM-DD  
> **Build Status:** `PASSING` (Initial setup)  
> **Maintained By:** Cursor AI / Claude Code / Claude Cowork

---

## 1. Milestone Status Summary
- **Target:** Complete Milestone 1 Foundation
- **Progress:** 0% Complete (0 / 4 Tasks)
- **Active Blockers:** None
- **Pending Assets:** Procedural placeholders active for Unit Sprites & Grid Tiles (Non-blocking)

---

## 2. Active Implementation Task Cards

### [ ] TASK-M1-01: Engine Bootstrap & Scene Manager
- **Priority:** High
- **Relevant Files:** `src/core/Main.ts` (or `.gd`), `src/core/SceneManager.ts`
- **What to Build:** Establish the main entry point, window resolution (1280x720 scaled to 1920x1080), 60 FPS fixed update loop, and basic SceneManager supporting `TitleScene` and `BattleScene`.
- **Dependencies:** None.
- **Acceptance Criteria:** Application launches a window, displays a background color, and logs initial scene transitions to console.

---

### [ ] TASK-M1-02: Grid Representation & Tile Coordinate Mapping
- **Priority:** High
- **Relevant Files:** `src/grid/GridManager.ts`, `src/grid/Tile.ts`
- **What to Build:** Create a 2D data model for a 10x10 tile grid. Each tile stores `{ x, y, elevation, terrain_type, is_walkable }`. Render tiles with basic isometric/orthogonal orientation.
- **Dependencies:** TASK-M1-01.
- **Acceptance Criteria:** 10x10 grid renders on screen with distinguishable elevations (height 0, 1, 2).

---

### [ ] TASK-M1-03: Tile Cursor & Input Navigation
- **Priority:** Medium
- **Relevant Files:** `src/core/InputHandler.ts`, `src/grid/TileCursor.ts`
- **What to Build:** Implement mouse hover detection and keyboard arrow navigation over grid tiles. Highlight the active hovered tile with a colored border.
- **Dependencies:** TASK-M1-02.
- **Acceptance Criteria:** Moving mouse or pressing WASD/Arrows moves the cursor smoothly over valid grid tiles and outputs selected tile coordinates.

---

### [ ] TASK-M1-04: Basic Unit Entity & Grid Placement
- **Priority:** Medium
- **Relevant Files:** `src/entities/UnitEntity.ts`, `src/entities/StatsComponent.ts`
- **What to Build:** Create `UnitEntity` with position `(x, y)`, facing direction, and base stats. Render a placeholder colored rectangle/sprite on tile `(2, 2)` for Hero and `(7, 7)` for Enemy.
- **Dependencies:** TASK-M1-03.
- **Acceptance Criteria:** 2 placeholder units render at correct tile positions, properly layered on top of the terrain grid.

---

## 3. Next Recommended Implementation Task
👉 **TASK-M1-01: Engine Bootstrap & Scene Manager**

---

## 4. Completed Work Archive
*(Tasks will be moved here as Cursor AI / Claude Code completes and verifies them)*

- None yet (Project initialized).
