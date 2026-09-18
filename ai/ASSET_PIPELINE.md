# ASSET PIPELINE & SPECIFICATION REGISTRY

> **Status:** `DRAFT` — schema and registry adopted from the template; visual direction ⏳ OPEN (**D-08**)
> **Maintained By:** Claude Cowork / Arena.ai
> **Media Storage:** `/assets/approved/` (shipped) · `/assets/mock/` (placeholders) · `/assets/raw/` (source files, never shipped)
> **Target Consumer:** ART/ASSET AI, human artists, Cursor AI / Claude Code

> ⚠️ **All registry rows below are 🔵 PROPOSAL** carried over from the template's worked example (Candidate Concept A). They are *specified but not approved*, and their style assumes the 16-bit pixel-art direction, which the owner has not yet chosen (**D-08**).
>
> ✅ **Missing art never blocks development** (DEC-002). Every asset here is `NON-BLOCKING`: the implementer uses procedural placeholders until the real file lands in `/assets/approved/` — and integration then requires **no code change**, because code loads by asset ID.

---

## 1. 10-Point Asset Specification Schema

Every media asset must define:

1. **Asset Identifier** — unique `snake_case` string (e.g. `hero_squire_idle_sheet`)
2. **Purpose & Context** — where and when it appears in the game, and what it communicates to the player
3. **Visual Style** — style references, palette, edge treatment, level of detail — specific enough that two artists produce compatible results
4. **Dimensions & Resolution** — exact pixel size and aspect ratio, at the reference resolution
5. **File Format** — PNG (transparency), WebP, GLTF, OGG, WAV…
6. **Repository Destination** — exact path under `/assets/approved/`
7. **Animation Specs** — frame count, FPS, looping mode, pivot/anchor, states fed
8. **Acceptance Criteria** — binary visual/audio benchmarks for approval
9. **Approval Status** — `SPECIFIED` | `IN_PROGRESS` | `DELIVERED` | `IN_REVIEW` | `APPROVED` | `REJECTED`
10. **Dependency Status** — always `NON-BLOCKING` (engine falls back to mock shapes)

**Shipped-size field (added for DEC-004):** every asset's **compressed runtime size** is recorded and summed against the payload budget (NFR-WEB-01). A visually correct asset that is too heavy to download is a failed asset.

### Spec template

```markdown
### AST-### — <Asset Name>
1. **Purpose:**
2. **Visual Style:**
3. **Dimensions / Resolution:**
4. **File Format:**
5. **Destination Path:**  /assets/approved/<category>/<asset_id>.<ext>
6. **Animation Specs:**
7. **Acceptance Criteria:**
8. **Shipped size (compressed):**
9. **Approval Status:**  SPECIFIED — <date>
10. **Dependency Status:**  NON-BLOCKING
```

---

## 2. Web Delivery Formats (mandated by DEC-004)

In a browser every asset is a download, so these are **defaults, not optimisations**:

- **Textures/images:** WebP (AVIF only where clearly smaller); RGBA8 where alpha is needed; **never ship large uncompressed PNGs**. Provide a PNG fallback if the browser matrix (D-25) requires older Safari support.
- **Audio:** Opus or Vorbis (`.ogg`); MP3 only as legacy fallback. Verify on a real iPhone if iOS is in the matrix — mobile Safari has historically been fussy.
- **Pixel art:** nearest-neighbour filtering; render at integer scale factors to avoid shimmering.
- **Sources never ship.** Aseprite/PSD/Blender files stay in `/assets/raw/`; the pipeline exports compressed runtime copies to `/assets/approved/`.

---

## 3. Placeholder / Mock Protocol (DEC-002)

When a required asset does not exist:

1. The asset gets a **spec entry** here with an ID and full 10-point spec. Spec'ing is design work and is never blocked.
2. Code references the asset **by ID only**.
3. If the file is absent, the `AssetManager` produces a **procedural placeholder**: a primitive shape filled with a colour derived deterministically from a hash of the asset ID, labelled with the ID. Audio → silence with a once-per-session log line.
4. Placeholders are **obviously** placeholder — never mistakable for final art in a screenshot.
5. **All non-art work continues:** logic, maths, systems, UI, balancing, tests.
6. When the approved asset lands, it is dropped into `/assets/approved/` and registered — **no code change required**.
7. From Milestone 3 onward, placeholders *inside the vertical slice* are treated as blocking defects for that milestone's exit criteria.

Any temporary asset in the build appears in the registry with status `PLACEHOLDER` and in `CURRENT_STATE.md` § Missing Assets.

---

## 4. Approval Workflow

```
SPECIFIED → IN_PROGRESS → DELIVERED → IN_REVIEW → APPROVED
                                          ↓
                                      REJECTED (reason → back to production)
```

**Review criteria (all must hold):** all 10 spec points satisfied literally · acceptance criteria pass · naming/format/path exactly as specified · style-consistent with already-approved assets of the same class · legible at actual in-game size against actual backgrounds · technically correct (dimensions, alpha, colour space, no stray pixels, no compression artifacts; audio without clipping or DC offset) · licence recorded.

**Approval authority:** the **owner** approves anything that defines the game's look (characters, key art, style-defining assets, store art). The agent may approve routine assets that strictly follow an already-approved style. **Rejections must state a reason** — "silhouette unreadable at 50% zoom" is actionable; "I don't like it" is not.

---

## 5. Registry — Character Sprites

| Asset ID | Dimensions | Format | Destination Path | Status | Approval |
|---|---|---|---|---|---|
| `hero_squire_idle` | 32×32 px (4 frames) | PNG/WebP | `/assets/approved/characters/hero_squire_idle.png` | `SPECIFIED` | Pending |
| `hero_squire_walk` | 32×32 px (6 frames) | PNG/WebP | `/assets/approved/characters/hero_squire_walk.png` | `SPECIFIED` | Pending |
| `enemy_goblin_idle` | 32×32 px (4 frames) | PNG/WebP | `/assets/approved/characters/enemy_goblin_idle.png` | `SPECIFIED` | Pending |
| `enemy_goblin_attack` | 32×32 px (6 frames) | PNG/WebP | `/assets/approved/characters/enemy_goblin_attack.png` | `SPECIFIED` | Pending |

> ⏳ Missing and needed before M3: attack, hurt and defeat frames for the hero; portrait art for the unit card; job-variant sprites; any additional enemy types (count depends on D-09).

## 6. Registry — Environment & Tiles

| Asset ID | Dimensions | Format | Destination Path | Status | Approval |
|---|---|---|---|---|---|
| `tile_grass_isometric` | 64×32 px (1 frame) | PNG/WebP | `/assets/approved/environments/tile_grass.png` | `SPECIFIED` | Pending |
| `tile_stone_isometric` | 64×32 px (1 frame) | PNG/WebP | `/assets/approved/environments/tile_stone.png` | `SPECIFIED` | Pending |
| `tile_water_isometric` | 64×32 px (4 frames animated) | PNG/WebP | `/assets/approved/environments/tile_water.png` | `SPECIFIED` | Pending |

> ⏳ Missing and needed before M1 (as placeholders they are trivial; as art they are required for M3): the **elevation variants** the game's core mechanic depends on. A 64×32 isometric tile needs height-block art for elevation tiers 1 and 2 (a tile at elevation 2 cannot be drawn with the elevation-0 sprite), plus cliff/edge pieces, plus any additional terrain types in the terrain table (`FEATURES.md` §5 gap #2).

## 7. Registry — UI & Audio

| Asset ID | Type | Specs | Destination Path | Status |
|---|---|---|---|---|
| `ui_cursor_select` | UI sprite | 64×32 px isometric frame | `/assets/approved/ui/cursor_select.png` | `SPECIFIED` |
| `sfx_sword_slash` | Audio SFX | 44.1 kHz, 16-bit source → Opus/OGG runtime | `/assets/approved/audio/sfx_slash.ogg` | `SPECIFIED` |
| `bgm_battle_theme` | Audio BGM | Seamless loop, OGG Vorbis | `/assets/approved/audio/bgm_battle.ogg` | `SPECIFIED` |

> ⏳ Missing: move-range and attack-range overlay tiles (must be **colour-blind-distinguishable**, NFR-ACC-01), turn-timeline portraits/icons, action-menu icons, HP/MP gauge art, `sfx_move`, `sfx_hit`, `sfx_crit`, `sfx_defeat`, `sfx_ui_click`, `sfx_ui_confirm`, `sfx_ui_cancel`, victory/defeat stings, title/main-menu BGM, and one ambience bed per terrain type. UI font must be specified and licensed for web embedding.

---

## 8. Style Guide

> ⏳ **OPEN — blocked on D-08 (visual direction, an owner decision).**

Once chosen, this section locks: the palette (primary/secondary/accent hex values **plus a colour-blind-safe set**) · line weight, edge treatment, shading model and LOD budget · lighting/mood per terrain type · character proportions and silhouette requirements · tile grid-snapping rules and elevation-block construction · UI visual language (corner radius, border weight, icon grid, text hierarchy) · reference images in `/assets/raw/` or a `/assets/_reference/` folder (never shipped) · and **anti-references** — what the game must *not* look like, which is as important as the references.

**Style cost warning:** pixel art is not automatically the cheap option. 16-bit isometric art with per-elevation tile blocks and multi-frame animations is a large, skilled workload. The owner should weigh style against the content count (D-09) **before** committing, because it is the single biggest determinant of total project duration.

---

## 9. Audio Pipeline Standards

- Assets delivered pre-normalised; no gain surgery in-engine beyond bus mixing.
- Every repeated SFX needs **at least 3 variations** to avoid machine-gun fatigue.
- All looping assets state loop points explicitly and must loop with no audible pop.
- No asset may clip (true peak ≤ −1 dBTP).
- Buses: music · SFX · UI · ambience, each independently adjustable (REQ-AUD-01).
- Audio must pass through the browser **unlock gate** (REQ-AUD-02) and failure must never be silent (REQ-AUD-03).

---

## 10. Technical Asset Budget

> ⏳ OPEN — set by D-25 (device floor) and D-08 (style). Will state: initial payload budget (proposed ≤5 MB, NFR-WEB-01) · total build size ceiling · max texture memory · audio memory budget · max sprites/tiles on screen at once · and the per-class poly/pixel budget.

**Budget discipline:** budgets are stated per asset class **before** production, and every delivered asset reports its cost. Overruns are caught at review, not at the end of production.

---

## 11. Licensing & Provenance

Every asset records provenance — original / AI-generated / licensed — including tool, prompt and date for AI-generated work, so provenance can be audited. Required attributions are captured in the credits requirement and verified in the `QA_TEST_PLAN.md` release gate. If the game ships to a web portal (D-24), that portal may impose its own asset and licence constraints; check before producing.

---

## 12. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Asset pipeline framework authored | Agent |
| 2026-09-18 | **Merged with the template's asset pipeline.** Adopted: the 10-point schema (including the template's `NON-BLOCKING` dependency rule), the approval status vocabulary, the placeholder protocol, the three registries with their specified assets, and the `/assets/approved|mock|raw/` structure. **Added:** the shipped-size field and web delivery-format rules (DEC-004), the approval workflow and review criteria, the style-cost warning, the audio pipeline standards, the technical budget section, licensing/provenance rules, and explicit lists of the **assets the template's registry is missing** — most importantly the elevation-block tiles that the height-advantage mechanic depends on. | Agent |
