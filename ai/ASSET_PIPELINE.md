# ASSET PIPELINE & SPECIFICATION REGISTRY

> **Status:** `ACTIVE`  
> **Maintained By:** Claude Cowork / Arena.ai  
> **Media Storage:** `/assets/approved/`  
> **Target Consumer:** ART/ASSET AI, Human Artists, Cursor AI

---

## 1. 10-Point Asset Specification Schema

Every media asset must define:
1. **Asset Identifier:** Unique snake_case string (e.g. `hero_squire_idle_sheet`).
2. **Purpose & Context:** Where and when it appears in the game.
3. **Visual Style:** 16-bit SNES Pixel Art, Flat Vector, Low-Poly 3D, etc.
4. **Dimensions & Resolution:** Exact pixel resolution and aspect ratio.
5. **File Format:** PNG (transparency), WebP, GLTF, OGG, WAV, MP3.
6. **Repository Destination:** Exact file path under `/assets/approved/`.
7. **Animation Specs:** Frame count, FPS, looping mode.
8. **Acceptance Criteria:** Visual/audio benchmarks for approval.
9. **Approval Status:** `SPECIFIED` | `IN_PROGRESS` | `APPROVED` | `REJECTED`.
10. **Dependency Status:** Always `NON-BLOCKING` (Engine uses mock shapes if unapproved).

---

## 2. Character Sprite Registry

| Asset ID | Dimensions | Format | Destination Path | Status | Approval |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `hero_squire_idle` | 32x32px (4 frames) | PNG | `/assets/approved/characters/hero_squire_idle.png` | `SPECIFIED` | Pending |
| `hero_squire_walk` | 32x32px (6 frames) | PNG | `/assets/approved/characters/hero_squire_walk.png` | `SPECIFIED` | Pending |
| `enemy_goblin_idle` | 32x32px (4 frames) | PNG | `/assets/approved/characters/enemy_goblin_idle.png` | `SPECIFIED` | Pending |
| `enemy_goblin_attack` | 32x32px (6 frames) | PNG | `/assets/approved/characters/enemy_goblin_attack.png` | `SPECIFIED` | Pending |

---

## 3. Environment & Tile Registry

| Asset ID | Dimensions | Format | Destination Path | Status | Approval |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `tile_grass_isometric` | 64x32px (1 frame) | PNG | `/assets/approved/environments/tile_grass.png` | `SPECIFIED` | Pending |
| `tile_stone_isometric` | 64x32px (1 frame) | PNG | `/assets/approved/environments/tile_stone.png` | `SPECIFIED` | Pending |
| `tile_water_isometric` | 64x32px (4 frames animated) | PNG | `/assets/approved/environments/tile_water.png` | `SPECIFIED` | Pending |

---

## 4. UI & Audio Registry

| Asset ID | Type | Specs | Destination Path | Status |
| :--- | :--- | :--- | :--- | :--- |
| `ui_cursor_select` | UI Sprite | 64x32px isometric frame | `/assets/approved/ui/cursor_select.png` | `SPECIFIED` |
| `sfx_sword_slash` | Audio SFX | Lossless 44.1kHz, 16-bit WAV | `/assets/approved/audio/sfx_slash.wav` | `SPECIFIED` |
| `bgm_battle_theme` | Audio BGM | Seamless loop, OGG Vorbis | `/assets/approved/audio/bgm_battle.ogg` | `SPECIFIED` |
