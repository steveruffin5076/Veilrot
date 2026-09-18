# CODING RULES & ARCHITECTURE STANDARDS

> **Target Audience:** Cursor AI / Claude Code Implementation Engineers  
> **Status:** `MANDATORY`

---

## 1. General Principles
- **KISS (Keep It Simple, Stupid):** Prefer simple, readable implementations over complex abstractions.
- **Single Responsibility:** Each class/module must do exactly one thing well.
- **Immutability:** Treat game config data as immutable data structures.
- **Type Safety:** Use strict typing (e.g. TypeScript strict mode / GDScript static typing / C# nullables).

---

## 2. File Organization & Structure
- Place all source files in `/src/`.
- File naming: PascalCase for classes/scenes (e.g. `BattleController.ts`), camelCase for utility functions and variables (e.g. `calculateDamage.ts`).
- Maximum file length: **300 lines**. If a file exceeds 300 lines, extract helper components or sub-controllers.

---

## 3. Game State & Component Architecture
- **State Separation:** Never mix visual rendering code with core game math or state.
  - Good: `CombatResolver.calculateDamage(attackerStats, targetStats)` returns a pure `DamageResult` object.
  - Bad: Combat calculation directly updates sprite tint and triggers sound inside math loop.
- **Event-Driven:** Use global `EventBus` to emit state changes (e.g. `EventBus.emit("unitDied", unit)`).

---

## 4. Performance & Memory Guidelines
- Target: 60 FPS constant frame rate.
- **Object Pooling:** Pool frequently created entities (e.g. floating damage numbers, particle emitters, projectile sprites).
- **Garbage Collection:** Avoid allocating large temporary objects inside `update()` or `process()` loops called 60 times/sec.

---

## 5. Asset Integration Rules
- Asset paths must be loaded via a centralized `AssetManager` or constant dictionary, never hardcoded string paths scattered across scripts.
- When an asset is missing in `/assets/approved/`, fallback gracefully to a solid-color box or procedural shape with a debug warning—never crash.
