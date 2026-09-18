# UX / UI DESIGN SPECIFICATION

> **Status:** `ACTIVE`  
> **Last Updated:** YYYY-MM-DD  
> **Maintained By:** Claude Cowork / Arena.ai  
> **Target Consumer:** Cursor AI / Claude Code

---

## 1. Screen Flow & Navigation Architecture

```
[Title Screen] ───> [Main Menu] ───┬───> [Squad / Inventory Screen]
                                    ├───> [Mission Select Map] ───> [Battle Scene] ───┬───> [Victory Screen]
                                    ├───> [Settings Menu]                             └───> [Defeat Screen]
                                    └───> [Credits]
```

---

## 2. In-Battle HUD Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Unit Turn Queue Timeline: Unit A > Unit B > Enemy X > Unit C]        [Pause]│
│                                                                         │
│                                                                         │
│                      ISOMETRIC TACTICAL MAP BATTLEFIELD                 │
│                                                                         │
│                                                                         │
│                                                                         │
│ ┌───────────────────────┐ ┌───────────────────┐ ┌─────────────────────┐ │
│ │ SELECTED UNIT CARD    │ │ ACTION MENU       │ │ TILE / TARGET INFO  │ │
│ │ Name: Knight Valen    │ │ [1] Move          │ │ Elevation: +2 Height│ │
│ │ HP: 120/120  MP: 30   │ │ [2] Attack        │ │ Defense Bonus: +10% │ │
│ │ Job: Squire (Lvl 3)   │ │ [3] Skill [JP]    │ │ Hit Chance: 85%     │ │
│ │ Status: Normal        │ │ [4] Item          │ │ Est. Damage: 28-34  │ │
│ │ Facing: NORTH         │ │ [5] Wait          │ │ Crit Chance: 12%    │ │
│ └───────────────────────┘ └───────────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. UI Component Design Tokens

### 3.1 Color Palette
- **Primary Background:** `#0F172A` (Deep Slate Obsidian)
- **Panel Surface:** `#1E293B` (Dark Slate Blue)
- **Panel Border:** `#334155` (Muted Slate with 1px border)
- **Primary Accent / Interactive:** `#4F46E5` (Royal Indigo) / `#6366F1`
- **HP Gauge Color:** `#10B981` (Emerald Green) -> `#EF4444` (Low HP Red)
- **MP Gauge Color:** `#3B82F6` (Electric Blue)
- **Selection Highlight:** `#F59E0B` (Amber Gold)
- **Tile Overlay - Move Range:** `#3B82F680` (Semi-transparent Blue, 50% Alpha)
- **Tile Overlay - Attack Range:** `#EF444480` (Semi-transparent Red, 50% Alpha)

### 3.2 Typography
- **Heading Font:** Pixel Bold / Clean Sans (16px / 20px)
- **Body Font:** High-legibility Monospace / Sans (12px / 14px)
- **HUD Micro-labels:** 10px Bold (HP/MP values, CT indicators)

---

## 4. Key Screens & State Specifications

### 4.1 Title Screen
- Logo banner with subtle floating animation.
- Menu Buttons: `New Game`, `Continue` (disabled if no save), `Options`, `Exit`.

### 4.2 Pause Menu
- Triggered by `Escape` / `Start` button.
- Overlays battle scene with a blurred dark backdrop (`#00000099`).
- Options: `Resume`, `Restart Battle`, `Options`, `Abandon to Map`.

### 4.3 Victory / Defeat Modal
- Modal appears upon condition fulfillment with celebratory/dramatic SFX.
- Shows XP gained per surviving unit, loot acquired, and `Continue` button.
