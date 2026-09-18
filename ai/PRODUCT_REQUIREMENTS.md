# PRODUCT REQUIREMENTS DOCUMENT (PRD)

> **Status:** `ACTIVE`  
> **Last Updated:** YYYY-MM-DD  
> **Maintained By:** Claude Cowork / Arena.ai  
> **Target Consumer:** Cursor AI / Claude Code

---

## 1. Core Gameplay Loop

```
┌─────────────────────────────────────────────────────────────┐
│                     THE CORE GAMEPLAY LOOP                  │
│                                                             │
│   ┌───────────────┐        ┌──────────────┐                 │
│   │ SQUAD PREP &  │───────>│ ENTER BATTLE │                 │
│   │ CUSTOMIZATION │        │   ENCOUNTER  │                 │
│   └───────────────┘        └──────┬───────┘                 │
│           ▲                       │                         │
│           │                       ▼                         │
│   ┌───────┴───────┐        ┌──────────────┐                 │
│   │ LOOT, XP &    │<───────│ RESOLVE TURN │                 │
│   │ SKILL UNLOCKS │        │ COMBAT LOOP  │                 │
│   └───────────────┘        └──────────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

1. **Phase 1: Pre-Battle / Exploration:** Player selects squad units, configures equipment, reviews mission objectives and terrain hazards.
2. **Phase 2: Tactical Engagement:** Player executes turns (Move, Action, Face direction), exploiting height advantages and element synergies.
3. **Phase 3: Encounter Resolution:** Victory / Defeat evaluation based on explicit win conditions (eliminate all foes, survive N turns, defeat boss).
4. **Phase 4: Progression & Meta-Loop:** Award experience points, skill points (JP), gold, and loot drops to upgrade squad capabilities.

---

## 2. Functional Requirements

### 2.1 Player Controls & Input
- **REQ-IN-01:** Support Mouse/Touch point-and-click navigation on isometric / 2D grid.
- **REQ-IN-02:** Support full Gamepad (D-pad + Buttons) and Keyboard (WASD / Arrows + Space/Enter) mappings.
- **REQ-IN-03:** Clear visual tile cursor with hover state highlighting movement range (blue) and attack range (red).

### 2.2 Turn & Action System
- **REQ-TRN-01:** Active Turn Queue calculated by Unit Speed stat (CT / Charge Time model).
- **REQ-TRN-02:** Each turn allows 1 Movement action and 1 Primary Action (Attack / Skill / Item / Wait).
- **REQ-TRN-03:** Directional facing (North, East, South, West) impacts defense (Side attacks +15% hit rate; Back attacks +30% crit rate).

### 2.3 Combat Math & Damage Formula
- **REQ-CBT-01:** Physical Damage Formula: `Damage = Max(1, (Attacker.Atk * Skill.Power / 100) - (Defender.Def * TerrainMod))`.
- **REQ-CBT-02:** Height Advantage: Attacking from a higher tile grants `+10% Damage` per height tier difference.
- **REQ-CBT-03:** Critical Hits deal `1.5x Damage` and trigger visual/sound impact VFX.

---

## 3. Non-Functional Requirements
- **NFR-PERF-01:** Stable 60 FPS on baseline target hardware (no frame drops during particle effects).
- **NFR-LOAD-01:** Battle scene load time under 1.5 seconds.
- **NFR-SAVE-01:** Save file serialization under 50ms with data integrity checksums.
- **NFR-ACC-01:** Colorblind friendly range overlays and configurable text scale.

---

## 4. MVP Acceptance Criteria
- [ ] Player can boot the game into a functional title screen.
- [ ] Player can load into a sample tactical grid arena.
- [ ] Player can control 2 hero units and fight 2 enemy units with full combat resolution.
- [ ] Victory screen triggers upon enemy defeat, awarding XP and returning to main menu.
