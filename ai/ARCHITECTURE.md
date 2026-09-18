# TECHNICAL & SYSTEM ARCHITECTURE

> **Status:** `ACTIVE`  
> **Last Updated:** YYYY-MM-DD  
> **Maintained By:** Claude Cowork / Arena.ai  
> **Target Consumer:** Cursor AI / Claude Code

---

## 1. High-Level Engine Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           GAME APPLICATION ROOT                         │
│                                                                         │
│  ┌───────────────────────┐  ┌────────────────────┐  ┌────────────────┐  │
│  │     SCENE MANAGER     │  │   INPUT HANDLER    │  │  AUDIO MANAGER │  │
│  │ (Title, Battle, Menu) │  │  (Mouse, Gamepad)  │  │  (BGM, SFX)    │  │
│  └───────────┬───────────┘  └─────────┬──────────┘  └────────────────┘  │
│              │                        │                                 │
│              ▼                        ▼                                 │
│  ┌───────────────────────────────────────────────┐  ┌────────────────┐  │
│  │              BATTLE SYSTEM CONTROLLER         │  │   EVENT BUS    │  │
│  │  ┌───────────────┐ ┌──────────────┐ ┌──────┐  │  │ (Global Events)│  │
│  │  │ Grid System   │ │ Turn Manager │ │ Combat│ │  └────────────────┘  │
│  │  │ (Pathfinding) │ │ (CT Queue)   │ │ Engine│ │                      │
│  │  └───────────────┘ └──────────────┘ └──────┘  │  ┌────────────────┐  │
│  └───────────────────────┬───────────────────────┘  │   DATA LAYER   │  │
│                          │                          │(Save/Load, JSON│  │
│                          ▼                          │   Database)    │  │
│  ┌───────────────────────────────────────────────┐  └────────────────┘  │
│  │               ENTITY LAYER (ECS / Nodes)      │                      │
│  │ [Unit Entity] -> StatsComp, AnimationComp, SpriteComp, AIComp        │
│  └───────────────────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Subsystems

### 2.1 Grid & Pathfinding System
- **Grid Representation:** 2D array or Dictionary of `Tile` data structures:
  `Tile = { x: int, y: int, elevation: int, terrain_type: TerrainEnum, occupant_id: UnitID | null, is_walkable: bool }`.
- **Pathfinding Algorithm:** A* (A-Star) search factoring in movement costs and unit elevation jump limits (Max jump: 2 tiers).
- **Range Calculations:** Manhattan distance / Dijkstra flood-fill for movement and attack bounds.

### 2.2 Turn Order & Time Queue (Charge Time / CT Model)
- Units accumulate CT each tick based on their `Speed` stat (`CT += Speed`).
- When a unit reaches `CT >= 100`, they claim the active turn.
- Performing Move only consumes 20 CT; Action only consumes 20 CT; Wait preserves 40 CT.

### 2.3 Event Bus / Signal Architecture
- Decouple systems using strongly typed events:
  - `on_turn_started(unit: UnitEntity)`
  - `on_unit_moved(unit: UnitEntity, path: List[Tile])`
  - `on_attack_executed(attacker: UnitEntity, target: UnitEntity, result: CombatResult)`
  - `on_unit_defeated(unit: UnitEntity)`
  - `on_battle_won() / on_battle_lost()`

### 2.4 Save & State Persistence
- All game state serialized to JSON:
  `{ version: 1, squad: [...], inventory: [...], campaign_progress: {...}, settings: {...} }`.
- Atomic writes with `.tmp` staging to prevent save file corruption during sudden exits.

---

## 3. Directory & File Conventions (Source Code)

```
src/
├── core/                  # Engine bootstrapping, global constants, EventBus
├── data/                  # Static databases (jobs.json, skills.json, items.json)
├── entities/              # UnitEntity, Hero, Enemy, StatsComponent
├── grid/                  # GridManager, Tile, PathfindingAStar, RangeFinder
├── systems/               # BattleController, TurnQueueManager, CombatResolver
├── ui/                    # HUDController, TurnTimelineUI, ActionMenuUI, DialogUI
└── utils/                 # MathHelpers, Serializer, Logger
```
