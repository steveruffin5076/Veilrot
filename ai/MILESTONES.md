# DEVELOPMENT MILESTONES & ROADMAP

> **Status:** `ACTIVE`  
> **Last Updated:** YYYY-MM-DD  
> **Maintained By:** Claude Cowork / Arena.ai  
> **Target Consumer:** You & Implementation Engineers

---

## Milestone Overview

```
[M1: Foundation] ──> [M2: Core Playable Loop] ──> [M3: Vertical Slice]
                                                          │
[M6: Release] <──── [M5: Polish & QA] <───── [M4: Content Expansion]
```

---

## Milestone Roadmap Details

### Milestone 1: Technical Foundation & Scaffolding
- **Objective:** Establish the project architecture, scene manager, grid representation, unit rendering, and keyboard/mouse input handling.
- **Key Features:**
  - Game window bootstrap & 60 FPS loop.
  - Isometric/2D grid data structure with tile rendering and hover cursor.
  - Basic unit rendering with placeholder color blocks / sprites.
  - Input controller for camera pan and tile selection.
- **Completion Criteria:** Window launches, displays a 10x10 grid, player moves a cursor across tiles, and selects a test unit.

---

### Milestone 2: Core Playable Combat Loop
- **Objective:** Implement full turn-based combat resolution between player and mock enemy units.
- **Key Features:**
  - A* pathfinding and movement range calculation.
  - Charge Time (CT) speed-based turn queue manager.
  - Basic physical attack, damage formula calculation, and HP bar updates.
  - Enemy AI turn execution (approach and attack).
  - Win/loss condition evaluation.
- **Completion Criteria:** Player can defeat an enemy unit or suffer defeat; combat log correctly reflects damage math.

---

### Milestone 3: Vertical Slice (The Playable Stage)
- **Objective:** Deliver 1 fully polished tactical battle stage with complete UI, audio, approved artwork, and cutscene intro.
- **Key Features:**
  - Complete battle HUD (Action menu, Turn timeline, Unit detail card).
  - Integration of approved 2D sprites, animations, and sound effects.
  - Pre-battle dialogue cutscene and victory rewards modal.
  - Title screen and pause menu.
- **Completion Criteria:** A polished 5-minute playable demo that looks and feels like a commercial game.

---

### Milestone 4: Content & System Expansion
- **Objective:** Scale mechanics, job classes, equipment, and multi-stage campaign.
- **Key Features:**
  - 4 playable job classes (Squire, Knight, Archer, White Mage).
  - Skill tree unlocking and JP economy.
  - 5 campaign stages with varied terrain, height tiers, and enemy compositions.
  - Save/Load game state serialization.
- **Completion Criteria:** Player can progress through 5 consecutive stages, customize squad jobs, and save/load progress.

---

### Milestone 5: Polish, Balance & QA Hardening
- **Objective:** Eliminate bugs, optimize performance, and fine-tune combat balance.
- **Key Features:**
  - Audio mastering (BGM volume, SFX balancing).
  - Accessibility settings (Colorblind options, key remapping, text scale).
  - Extensive edge-case testing (simultaneous turn ticks, boundary jumps).
  - Performance profiling (Zero frame drops during heavy combat particles).
- **Completion Criteria:** Zero critical bugs in `ai/QA_TEST_PLAN.md`; rock-solid 60 FPS performance.

---

### Milestone 6: Release & Distribution
- **Objective:** Final release packaging, distribution binaries, and store assets.
- **Key Features:**
  - Production build generation (Steam / Web / Mobile).
  - Crash reporting / analytics integration (optional).
  - Store page graphics and release documentation.
- **Completion Criteria:** Signed release binaries deployed and tested across target platforms.
