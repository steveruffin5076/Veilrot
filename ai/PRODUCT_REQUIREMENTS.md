# PRODUCT REQUIREMENTS DOCUMENT (PRD)

> **Status:** `DRAFT` — requirements recovered from the template's worked example (Candidate Concept A)
> **Last Updated:** 2026-09-18
> **Maintained By:** Claude Cowork / Arena.ai
> **Target Consumer:** Cursor AI / Claude Code
> **Platform:** ✅ browser-first per **DEC-004**

> ⚠️ **All requirement content below is 🔵 PROPOSAL**, recovered from the worked example in the uploaded starter template. Nothing is implementable until **D-01a** (concept) is approved. Numbers marked *(e.g.)* are examples, not agreed values.

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

1. **Phase 1 — Pre-battle / preparation:** select squad units, configure equipment, review mission objectives and terrain hazards.
2. **Phase 2 — Tactical engagement:** execute turns (Move, Action, Face direction), exploiting height advantage and element/skill synergies.
3. **Phase 3 — Encounter resolution:** victory/defeat evaluated against explicit win conditions (eliminate all foes · survive N turns · defeat a boss).
4. **Phase 4 — Progression & meta-loop:** award EXP, job points (JP), gold and loot to upgrade the squad.

**Loop timing target** ⏳ OPEN: how long is a single battle? (Proposal: 5–12 minutes per encounter at MVP scale; this number drives level sizing, save frequency and mobile session design.)

---

## 2. Functional Requirements

> Numbering convention adopted from the template: `REQ-<DOMAIN>-<NN>`.
> Categories present: `IN` input · `TRN` turn system · `CBT` combat · `UI` interface · `PRO` progression · `SAV` save · `AUD` audio · `PLT` platform.

### 2.1 Player Controls & Input — `REQ-IN-*`

- **REQ-IN-01:** Support mouse/touch point-and-click navigation on the isometric grid.
- **REQ-IN-02:** Support keyboard (WASD/arrows + Space/Enter) and gamepad (D-pad + buttons) mappings.
- **REQ-IN-03:** Clear tile cursor with a hover state highlighting movement range (blue) and attack range (red).
- **REQ-IN-04** *(added — DEC-004)*: **Fully playable on a touch device with no mouse or keyboard**, including a complete battle. No interaction may depend on hover, right-click, or precision dragging.
- **REQ-IN-05** *(added — DEC-004)*: Input prompts must switch glyph sets automatically when the active input device changes.
- **REQ-IN-06** *(added — DEC-004)*: Movement/attack ranges must be distinguishable **without relying on colour alone** (colour-blind requirement, NFR-ACC-01) — use pattern, outline or iconography.

### 2.2 Turn & Action System — `REQ-TRN-*`

- **REQ-TRN-01:** Active turn queue is derived from unit Speed using a Charge Time (CT) model.
- **REQ-TRN-02:** Each turn allows one Movement action and one Primary Action (Attack / Skill / Item / Wait).
- **REQ-TRN-03:** Directional facing (N/E/S/W) affects defence — side attacks +15% hit rate; back attacks +30% crit rate *(example values, unapproved)*.
- **REQ-TRN-04** *(added)*: The CT queue must be **visible to the player** (turn timeline UI) at all times — the strategic value of a CT system is lost if the player cannot see the order.

### 2.3 Combat Math & Damage Formula — `REQ-CBT-*`

- **REQ-CBT-01:** Physical damage: `Damage = Max(1, (Attacker.PATK * Skill.Power / 100) - (Defender.PDEF * TerrainMod))` *(example formula, unapproved)*.
- **REQ-CBT-02:** Height advantage — attacking from a higher tile grants +10% damage per elevation tier difference *(example value; note `DECISIONS.md` DEC-003 logs this as a "user approved" template decision — **needs owner re-confirmation** for this project)*. Uphill attacks incur a −10% accuracy penalty.
- **REQ-CBT-03:** Critical hits deal 1.5× damage with distinct visual and audio feedback.
- **REQ-CBT-04** *(added)*: **Damage preview before commitment** — the UI must show estimated damage, hit chance and crit chance for the currently targeted tile/unit *before* the player confirms the attack. This is the legibility pillar (§1, PROJECT.md) expressed as a hard requirement.
- **REQ-CBT-05** *(added)*: All combat maths must be unit-testable in isolation (pure functions, seeded RNG, no rendering dependency).

### 2.4 Progression — `REQ-PRO-*`

- **REQ-PRO-01:** Actions award EXP (unit level) and JP (job points) *(from FEATURES.md §2.1 — proposal)*.
- **REQ-PRO-02:** JP is spent in the squad menu to unlock active skills and passive reaction abilities.
- **REQ-PRO-03:** Job unlocking is gated on job level (e.g. Squire Lv2 → Knight).
- **REQ-PRO-04:** Dual-classing — 1 primary + 1 secondary skillset.
- ⏳ **Scope dependency:** which jobs actually exist depends on **D-09** (the template conflicts: 4 classes vs 8 classes).

### 2.5 Save, Settings & Accessibility — `REQ-SAV-*`

- **REQ-SAV-01:** Serialise squad, inventory, campaign progress and settings to JSON with a `version` field.
- **REQ-SAV-02:** Atomic writes — never overwrite a save in place; stage to `.tmp` then swap.
- **REQ-SAV-03:** Corruption is detected and reported, never loaded blindly.
- **REQ-SAV-04** *(added — DEC-004)*: Save to browser storage that is treated as **evictable**; autosave on tab-hide.
- **REQ-SAV-05** *(added — DEC-004)*: **Export/import save file**, giving the player a backup and giving support a recovery path.
- **REQ-SAV-06** *(added — DEC-004)*: Losing browser storage must degrade gracefully — a clear message and a fresh start option, never a crash or a corrupted-state load.

### 2.6 UI / UX — `REQ-UI-*`

- **REQ-UI-01:** In-battle HUD showing: turn timeline, selected unit card, action menu, and tile/target information.
- **REQ-UI-02:** Title screen, main menu, squad screen, mission select, battle, victory/defeat, settings, credits.
- **REQ-UI-03:** Pause menu available at any time during battle.
- **REQ-UI-04** *(added — DEC-004)*: Every screen must have a **desktop and a touch layout**; layouts must survive resize and orientation change mid-session.
- **REQ-UI-05** *(added — DEC-004)*: Touch targets sized for a thumb; nothing interactive inside device safe areas.

### 2.7 Audio — `REQ-AUD-*`

- **REQ-AUD-01:** Separate music, SFX and UI buses with independent volume in settings.
- **REQ-AUD-02** *(added — DEC-004)*: Audio must pass through an explicit **unlock gate** on first user interaction, and must re-unlock after tab resume.
- **REQ-AUD-03** *(added)*: Audio failure must never be silent — if a sound cannot play, the game must not appear broken.

### 2.8 Platform / Meta — `REQ-PLT-*`

- **REQ-PLT-01** *(added — DEC-004)*: The build deploys as a static folder over HTTPS from a single documented command.
- **REQ-PLT-02** *(added — DEC-004)*: Build version string visible in the UI/debug overlay.
- **REQ-PLT-03** *(added — DEC-004)*: Content-hashed assets + service worker so updates are atomic for players.
- **REQ-PLT-04** *(added — DEC-004)*: PWA manifest + service worker (prerequisite for TWA packaging, `DECISIONS.md` D-23).
- **REQ-PLT-05:** ⏳ Android packaging method per **D-23**.

---

## 3. Non-Functional Requirements

### 3.1 Platform-independent

| ID | Requirement | Target | Status |
|---|---|---|---|
| NFR-PERF-01 | Stable framerate | 60 FPS, no drops during heavy particle effects | 🔵 |
| NFR-PERF-02 | Frame time | ≤ 16.6 ms (render ≤ 10 ms, logic ≤ 4 ms) | 🔵 |
| NFR-LOAD-01 | Battle scene load | ≤ 1.5 s | 🔵 |
| NFR-SAVE-01 | Save serialisation | ≤ 50 ms with integrity checksum | 🔵 |
| NFR-ACC-01 | Accessibility | Colour-blind-friendly range overlays; configurable text scale; remappable keys | 🔵 |
| NFR-QUAL-01 | Code quality | Zero errors, zero warnings; task-card tests pass | 🔵 |
| NFR-LOC-01 | Localisation readiness | All player-facing strings externalised from day one | 🔵 |

### 3.2 Web / mobile (mandated by DEC-004)

| ID | Requirement | Target | Status |
|---|---|---|---|
| NFR-WEB-01 | **Initial payload** | ≤ 5 MB to first playable frame (proposed; final number pending D-25) | 🔵 |
| NFR-WEB-02 | **Time to first play** | ≤ 5 s mid-range Android on 4G; ≤ 2 s desktop broadband | 🔵 |
| NFR-WEB-03 | **Progress feedback** | Real progress indicator for any load over 2 s | 🔵 |
| NFR-WEB-04 | **Touch support** | Fully playable by touch, no hover/right-click dependency anywhere | 🔵 |
| NFR-WEB-05 | **Mobile perf floor** | Meets NFR-PERF-01 measured **on a real device** (tier per D-25) | ⏳ |
| NFR-WEB-06 | **Tab lifecycle** | Backgrounding/resuming loses no progress and never corrupts state | 🔵 |
| NFR-WEB-07 | **Save durability** | Survives reload; eviction risk mitigated and disclosed; export/import present | 🔵 |
| NFR-WEB-08 | **Browser matrix** | Explicitly listed + tested browsers; unsupported users get a clear message, not a broken screen | ⏳ (D-25) |
| NFR-WEB-09 | **Offline / caching** | A cached build still runs offline; players never run a stale half-updated build | 🔵 |

---

## 4. MVP Definition & Acceptance Criteria

**MVP (Milestone 2–3 target)** 🔵

- [ ] Player can boot into a functional title screen.
- [ ] Player can load into a sample tactical grid arena.
- [ ] Player can control 2 hero units against 2 enemy units with full combat resolution.
- [ ] Victory screen triggers on enemy defeat, awards XP, and returns to the main menu.
- [ ] The battle is fully playable with **mouse/keyboard *and* touch** (added — DEC-004).
- [ ] Runs from a browser tab loaded over HTTPS, cold, within NFR-WEB-02.
- [ ] Frame rate holds with no drops during VFX (NFR-PERF-01).

### 4.1 Explicitly NOT in MVP

⏳ OPEN — to be written alongside the scope ceiling (D-09). This list is as important as the MVP list; it is the project's defence against scope creep. Candidates to be excluded: dual-classing, job trees beyond the starter jobs, campaign progression, multiple stages, boss encounters, localisation, achievements.

---

## 5. Definition of Done

1. Implemented on a branch, reviewed, merged.
2. Acceptance criteria met and verified by a QA test case in `QA_TEST_PLAN.md`.
3. No placeholder assets remain that the requirement depends on — unless explicitly labelled mock-first in `ASSET_PIPELINE.md` (mock-first is always non-blocking).
4. Performance budgets still met.
5. `CURRENT_STATE.md` updated.
6. No new warnings; no TODO without a task-card reference.

---

## 6. Open Questions

| # | Question | Blocks | Ref |
|---|---|---|---|
| Q-01 | **Is Candidate Concept A the game?** | Everything | D-01a |
| Q-02 | Engine: Phaser 4 or Godot 4? | M1 | D-02 |
| Q-03 | Scope ceiling: 4 job classes / 5 stages, or 8 / 15? (template conflict) | Content, save shape, M4 | D-09 |
| Q-04 | Re-confirm height advantage (+10%/tier, −10% uphill accuracy)? | Combat maths | DEC-003, D-06 |
| Q-05 | Single-player only? | Architecture | D-12 |
| Q-06 | Monetization (matters for portals/ads and Play Billing)? | Store/distribution | D-10, D-24 |
| Q-07 | Where does the game live on the web? | Distribution, SDKs | D-24 |
| Q-08 | Mobile device floor? | Perf budgets, test matrix | D-25 |
| Q-09 | Target battle length? | Level sizing, save frequency | — |

---

## 7. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Initial PRD conventions authored | Agent |
| 2026-09-18 | **Merged with the template's PRD.** Preserved and adopted: the core-loop diagram, `REQ-*` numbering convention, `REQ-IN`/`REQ-TRN`/`REQ-CBT` content, template NFRs, and the MVP acceptance list. **Added** requirements mandated by DEC-004 (touch-first playability, input glyph switching, colour-blind range differentiation, damage preview before commitment, web save durability + export/import, audio unlock, static deploy, build versioning, PWA) and the web NFR block. Flagged the template's scope conflict and the need to re-confirm DEC-003's height-advantage numbers for this project. | Agent |
