# GAMEPLAY FEATURES & MECHANICS SPECIFICATION

> **Status:** `DRAFT` — content recovered from the template's worked example (Candidate Concept A)
> **Last Updated:** 2026-09-18
> **Maintained By:** Claude Cowork / Arena.ai
> **Target Consumer:** Cursor AI / Claude Code

> ⚠️ **All mechanics below are 🔵 PROPOSAL.** Every number is an *example value* from the template, not an approved balance target. Nothing is implementable until **D-01a** approves the concept and **D-09** sets the scope ceiling.

---

## 1. Unit Attributes & Character Stats

*Adopted from the template. All values require rebalancing — they are example ranges, not tuned numbers.*

| Stat | Key | Description | Example range |
|---|---|---|---|
| Hit Points | `HP` | Vitality; unit is incapacitated at 0 | 80–500 (scales per level/job) |
| Mana Points | `MP` | Resource for magic and special abilities | 20–200 |
| Physical Attack | `PATK` | Scaling for basic attacks and melee skills | 10–100 |
| Physical Defense | `PDEF` | Mitigation against physical damage | 5–80 |
| Magic Attack | `MATK` | Scaling for spells and arcane damage | 10–100 |
| Magic Defense | `MDEF` | Mitigation against magical damage | 5–80 |
| Speed | `SPD` | Rate of Charge Time (CT) accumulation | 6–18 |
| Move Range | `MOV` | Grid tiles traversable per turn | 3–5 |
| Jump Height | `JMP` | Maximum elevation climb/descend | 2–4 |

**Design rule:** every stat above must live in `src/data/` as tunable data. A designer must be able to rebalance the entire game without touching code.

**Missing from the template and needed** ⏳: hit chance / accuracy stat or formula, evasion, terrain modifiers, status-effect list, elemental resistance model, and the equipment stat-modifier model. These will be specified on concept approval.

---

## 2. Job Class Tree & Synergies

```
[Squire (Basic Melee)] ───┬───> [Knight (Heavy Armor / Rend Skills)]
                          └───> [Archer (Ranged Bows / High Elevation)]

[Chemist (Items/Heals)] ──┬───> [White Mage (Holy Magic / Cures)]
                          └───> [Black Mage (Elemental Fire/Ice/Lightning)]
```

> ⚠️ **Scope conflict:** this tree implies **6 jobs** (Squire, Knight, Archer, Chemist, White Mage, Black Mage); `PROJECT.md` §4 of the template implies **8 classes with dual-classing**; `MILESTONES.md` M4 of the template states **4 classes**. Three documents, three answers — owner ruling required (**D-09**).

### 2.1 Job Progression Rules *(template proposal)*
- Actions award **EXP** (unit level) and **JP** (job points).
- JP is spent in the squad menu to unlock active skills and passive reaction abilities.
- Unlocking Level 2 in Squire unlocks Knight; Level 2 in Chemist unlocks White Mage.
- **Dual-classing:** 1 primary skillset + 1 secondary skillset.

**Agent's recommendation:** ship MVP with the **four starter jobs** (Squire, Chemist, Knight, White Mage or Archer), and treat dual-classing as a Milestone-4+ feature. Dual-classing multiplies the balance surface far beyond its apparent cost — every skill combination becomes a testing obligation.

---

## 3. Enemy AI Behaviour Rules

```
                       [EVALUATE ACTIVE TURN]
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [HP <= 25% & HAS ITEM?]          [HP > 25% NORMAL]
                 │                               │
         ┌───────┴───────┐               ┌───────┴───────┐
         ▼               ▼               ▼               ▼
    [USE HEAL ITEM] [RETREAT SAFELY] [FIND WEAKEST]  [ATTACK FROM]
                                     [TARGET IN RNG] [HEIGHT/FLANK]
```

1. **Self-preservation:** below 25% HP with a healing item/spell available, prioritise self-healing or retreating to cover.
2. **Target prioritisation:**
   - Priority 1 — a target that can be eliminated this turn (`Target.HP <= EstimatedDamage`).
   - Priority 2 — lowest PDEF, or a vulnerable flank (back attack).
   - Priority 3 — soft support units (mages, chemists).
3. **Positioning:** move to tiles offering height advantage (+1 tier) or terrain defence bonus.

**Agent's additions (🔵 proposed):**
- **AI must be deterministic given a seed.** Non-reproducible AI makes bug reports unusable.
- **AI must be legible:** the player should be able to understand *why* an enemy did what it did. This ties to the legibility design pillar (`PROJECT.md` §2).
- **AI must not be perfect.** An AI that always finds the optimal play feels unfair and removes the tactical fantasy. Deliberate imperfection (an "aggression" or "competence" parameter) is a design lever, not a bug.

---

## 4. Feature Register

> ⏳ **Status column is the lifecycle gate.** A feature may not reach `IN DEV` without acceptance criteria and asset IDs, and may not reach `VERIFIED` without a passing QA case.

**Lifecycle:** `IDEA → PROPOSED → APPROVED → IN DESIGN → SPEC'D → IN DEV → IMPLEMENTED → VERIFIED` (or `CUT` with a decision record)

| ID | Feature | Priority | Milestone | Status |
|---|---|---|---|---|
| FEAT-GRID-01 | Isometric grid + tile rendering + elevation tiers | MUST | M1 | PROPOSED |
| FEAT-IN-01 | Tile cursor, hover, keyboard/touch navigation | MUST | M1 | PROPOSED |
| FEAT-UNIT-01 | Unit entity, stats component, grid placement | MUST | M1 | PROPOSED |
| FEAT-MOVE-01 | A\* pathfinding + movement range preview | MUST | M2 | PROPOSED |
| FEAT-TURN-01 | CT turn queue + visible turn timeline | MUST | M2 | PROPOSED |
| FEAT-CBT-01 | Physical attack resolution + damage formula | MUST | M2 | PROPOSED |
| FEAT-CBT-02 | Damage/hit/crit preview before commitment | MUST | M2 | PROPOSED |
| FEAT-AI-01 | Enemy AI turn execution (heal/retreat/target/position) | MUST | M2 | PROPOSED |
| FEAT-WIN-01 | Win/loss condition evaluation + results screen | MUST | M2 | PROPOSED |
| FEAT-UI-01 | Complete battle HUD (unit card, action menu, tile info) | MUST | M3 | PROPOSED |
| FEAT-UI-02 | Title / main menu / pause / settings screens | MUST | M3 | PROPOSED |
| FEAT-UI-03 | Touch layout for every screen | MUST | M3 | PROPOSED |
| FEAT-AUD-01 | Music + SFX buses, audio unlock gate | SHOULD | M3 | PROPOSED |
| FEAT-PROG-01 | EXP + JP economy, squad menu, skill unlocks | SHOULD | M4 | PROPOSED |
| FEAT-JOB-01 | Job classes (count per D-09) | SHOULD | M4 | PROPOSED |
| FEAT-SAV-01 | Save/load + export/import + migration | SHOULD | M4 | PROPOSED |
| FEAT-CAM-01 | Campaign: multi-stage progression | SHOULD | M4 | PROPOSED |
| FEAT-PROG-02 | Dual-classing | COULD | M4+ | PROPOSED |
| FEAT-META-01 | Achievements, credits, stats | COULD | M5 | PROPOSED |
| FEAT-ACC-01 | Accessibility options (colour-blind, text scale, remap) | SHOULD | M5 | PROPOSED |
| FEAT-PLT-01 | PWA manifest + service worker | SHOULD | M3+ | PROPOSED |
| FEAT-PLT-02 | Android packaging (TWA/Capacitor) | COULD | M6 | PROPOSED |
| FEAT-MP-01 | Multiplayer / skirmish mode | WON'T (this release) | Post | IDEA |

**Priority key:** MUST = required for MVP · SHOULD = schedules into M4 · COULD = only if schedule allows, first to cut · WON'T = explicitly excluded this release.

**Gate rule:** CUT requires a decision record in `DECISIONS.md`. Features are never deleted silently.

---

## 5. Open Specification Gaps

These are unimplementable today and will be specified on concept approval:

| # | Gap | Needed by |
|---|---|---|
| 1 | Hit/accuracy formula, evasion, and the full damage pipeline | M2 |
| 2 | Terrain type table with movement cost + defence modifier per type | M1 |
| 3 | Status effects list (poison, slow, silence…) and stacking rules | M2+ |
| 4 | Elemental model and resistance/weakness table | M2+ |
| 5 | Skill list per job (names, cost, power, range, area) | M4 |
| 6 | Item/equipment list and stat modifiers | M4 |
| 7 | Level-up curve, EXP curve, JP costs | M4 |
| 8 | Battle length target and stage size conventions | M1 |

---

## 6. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Features register structure and lifecycle gates authored | Agent |
| 2026-09-18 | **Merged with the template's features document.** Adopted: stat table, job tree, progression rules, AI behaviour tree. Added the feature register with priorities/milestones, AI determinism and legibility requirements, agent recommendation on job scope, and an explicit **specification-gap list** (accuracy formula, terrain table, status effects, elements, skill/item lists, curves) that must be closed before implementation. | Agent |
