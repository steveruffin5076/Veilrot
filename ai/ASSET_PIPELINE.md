# ASSET_PIPELINE.md — Art, Audio & Media Asset Specification

**Purpose:** Every piece of art/media Veilrot needs is specified here **before** it exists, in a fixed 10-point format, so that an Art AI, a human artist, or a placeholder generator can all produce work that fits the game without further discussion.

**Status:** ⚠️ Registry empty — blocked on concept intake and on **D-08 (visual direction)**, since style, resolution and animation cost are all downstream of that decision.

**Platform note (DEC-001):** the game targets browser and mobile-browser delivery, so every asset's *shipped file size* is a first-class spec field — see §1 points 4–5 and §7. A visually correct asset that is too heavy to download is a failed asset. The **spec format, the folder taxonomy, the mock-asset protocol and the acceptance/approval workflow are established and ready.**

---

## 1. The 10-point asset specification (mandatory format)

Every asset in this project is specified using exactly these ten fields. A spec missing any field is not ready to be produced.

| # | Point | What it must state |
|---|---|---|
| **1** | **Asset Name** | Human-readable name (e.g. "Player Character — Idle") |
| **2** | **Purpose** | Why the game needs it and where it appears; what it communicates to the player |
| **3** | **Visual Style** | Style references, palette, line/edge treatment, lighting, level of detail, material feel — specific enough that two artists would produce compatible results |
| **4** | **Dimensions / Resolution** | Exact pixel or world-unit size, aspect ratio, and the reference resolution it is authored against |
| **5** | **Format** | File format, colour space, bit depth, alpha requirements, compression target (e.g. `.png` RGBA8, `.ogg` Vorbis q6, `.glb` + `.webp` textures) |
| **6** | **Filename / Path** | Exact asset ID and destination path in `/assets/...`, matching the naming convention |
| **7** | **Animation Requirements** | Frame count / duration, key states, loop type, frame rate, pivot/anchor, state machine states it feeds, VFX or sound hooks |
| **8** | **Acceptance Criteria** | Binary, checkable conditions for approval (e.g. "silhouette readable at 64 px", "no visible seams when tiled", "loops with no pop") |
| **9** | **Approval Status** | `SPEC'D → IN PRODUCTION → DELIVERED → IN REVIEW → APPROVED` / `REJECTED (reason)` — with approver and date |
| **10** | **Stored in `ASSET_PIPELINE.md`** | The registry entry below is the record; the actual file lives in `/assets/<category>/` |

### Spec template (copy for each asset)

```markdown
### AST-### — <Asset Name>
1. **Purpose:**
2. **Visual Style:**
3. **Dimensions / Resolution:**
4. **Format:**
5. **Filename / Path:**  assets/<category>/<asset_id>.<ext>
6. **Animation Requirements:**
7. **Acceptance Criteria:**
8. **Depends on / variant of:**  (other asset IDs)
9. **Approval Status:**  SPEC'D — <date>
10. **Registry:**  see §5
```

---

## 2. Asset ID & naming conventions

- **Asset ID:** `AST-###`, allocated sequentially, never reused. The ID is the stable identity — code loads by ID, never by path.
- **Filename:** `snake_case`, no spaces, no version numbers in filenames (`player_idle_01.png`, not `Player Idle final v2.png`).
- **Category prefix in the ID block:** `1xx` Characters · `2xx` Environment · `3xx` UI · `4xx` VFX · `5xx` Audio (music/sfx) · `6xx` Fonts · `7xx` Marketing/store.
- **Path structure:**
  ```
  assets/art/characters/…      assets/art/environment/…      assets/art/vfx/…
  assets/ui/…                  assets/audio/music/…          assets/audio/sfx/…
  assets/fonts/…               assets/_reference/…           (mood boards — never shipped)
  ```
- **Versions** are tracked by git and the registry's status field, never in filenames.

---

## 3. Mock / placeholder protocol — **the project is never blocked by missing art**

Owner-mandated rule. Applies to every environment, including any without art-authoring tools.

**When a required asset does not exist yet:**

1. The asset gets a **spec entry** here with an ID and full 10-point spec. Spec'ing is design work and is never blocked.
2. Code references the asset **by ID only**.
3. If the file is absent, the asset service produces a **procedural placeholder**:
   - **Visual:** a primitive shape (rectangle/capsule/quad) whose colour is derived deterministically from a hash of the asset ID, with the asset ID rendered as a label on or above it. Optionally a checkerboard "missing texture" pattern.
   - **Audio:** silence, or a short neutral tone, logged once per session.
   - **Fonts:** the engine's default font.
4. Placeholders are **obviously** placeholder — never mistakable for final art, and ideally visible as such in screenshots.
5. **All non-art work continues**: logic, math, systems, UI layout, balancing, tests, tooling. A missing asset never converts into a blocked task.
6. When the real asset is delivered and approved, it is dropped into `/assets/...` and registered — **integrating it requires no code change**, only the file's arrival.
7. Placeholders that remain inside a milestone whose exit criteria forbid placeholders (Milestone 3 onward, inside the slice) are treated as **blocking defects** for that milestone.

**Placeholder tracking:** any temporary asset in the build appears in the registry with status `PLACEHOLDER`, and it shows up in `CURRENT_STATE.md` §5 Missing assets.

---

## 4. Production & approval workflow

```
SPEC'D  →  IN PRODUCTION  →  DELIVERED  →  IN REVIEW  →  APPROVED
                                              ↓
                                          REJECTED (reason → back to production)
```

**Review criteria at IN REVIEW** (all must hold):
- [ ] All 10 spec points satisfied literally, not approximately.
- [ ] Acceptance criteria in point 8 all pass.
- [ ] Naming, format and path exactly as specified.
- [ ] Style-consistent with already-approved assets of the same class.
- [ ] Legible at its actual in-game size and against its actual backgrounds.
- [ ] Technical: correct dimensions, alpha, colour space, no stray pixels, no compression artifacts; audio has no clipping, no silence padding, no DC offset.
- [ ] Licence: original or properly licensed, with attribution recorded where required.

**Approval authority:** the owner approves anything that defines the game's look (characters, key art, style-defining assets, store art). The agent may approve routine, style-consistent assets that strictly follow an already-approved style. **Rejections must state the reason** — "I don't like it" is not actionable; "silhouette unreadable at 50% zoom" is.

---

## 5. Asset registry

**Legend:** SPEC'D · IN PRODUCTION · DELIVERED · IN REVIEW · APPROVED · PLACEHOLDER · REJECTED · CUT

| ID | Asset Name | Category | Purpose | Path | Status |
|---|---|---|---|---|---|
| — | *No assets specified yet — awaiting concept intake (D-01) and visual direction (D-08).* | — | — | — | — |

---

## 6. Style guide

> ⏳ OPEN — blocked on D-08 (owner decision).

Once the owner chooses a direction, this section will lock:
- Palette (primary/secondary/accent with hex values, plus a colour-blind-safe alternative set)
- Line weight and edge treatment · shading model · level of detail budget
- Lighting model and mood per area type
- Character proportion rules and silhouette requirements
- Environment/module sizes and grid snapping
- UI visual language (corner radius, border weight, icon grid, text hierarchy)
- **Reference images:** mood boards stored in `assets/_reference/` (never shipped, never loaded at runtime)
- **Anti-references:** what this game must *not* look like — as important as the references

---

## 7. Audio pipeline

> ⏳ OPEN. Once the concept exists, this covers: music (format, loop points, stems, mix bus targets), SFX (naming, loudness normalisation target in LUFS, variations to avoid repetition fatigue, pitch randomisation ranges), ambience beds, UI sounds, and voice (pending D-11).

**Standards that can be fixed now (🔵 PROPOSAL):**
- Music/SFX delivered pre-normalised; no additional gain surgery in-engine beyond bus mixing.
- Every repeated SFX needs at least 3 variations to avoid machine-gun fatigue.
- All looping assets must state loop points explicitly and must loop without an audible pop.
- No audio asset may clip (true peak ≤ −1 dBTP).

---

## 8. Technical asset budget

> ⏳ OPEN — set by D-03 (platform) and D-08 (style). This section will state: max texture memory, max draw calls/objects on screen, audio memory budget, total download size ceiling, and the target triangle/poly count per asset class.

**Budget discipline:** budgets are stated per asset class *before* production, and every delivered asset reports its cost against them. Budget overruns are caught at review, not at the end of production.

---

## 9. Storage & licensing rules

- All source art lives in `/assets`; large binaries follow the external-storage convention decided with **D-02/D-03** if they exceed repository limits.
- Never commit: PSD/Blender working files unless the owner wants them versioned, engine caches, exported copies of the same asset in multiple formats without a reason.
- Every asset records its provenance: original / AI-generated / licensed — and any required attribution is captured in the credits requirement (PR-9xx) and `QA_TEST_PLAN.md` release gate.
- AI-generated assets: the tool, prompt and date are recorded in the registry entry so provenance can be audited.

---

## 10. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. 10-point spec format, asset ID scheme, folder taxonomy, mock-placeholder protocol, production/approval workflow, audio standards and licensing rules established. Registry empty pending intake. | Agent |
| 2026-09-18 | **Updated for DEC-001 (browser-first).** Added web delivery format defaults (WebP/AVIF, Opus/Vorbis, no shipped source files, per-asset size accounting against the payload budget). | Agent |
