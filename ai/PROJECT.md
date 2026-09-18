# PROJECT CHARTER

> **Status:** `DRAFT` — awaiting owner confirmation of the game concept
> **Last Updated:** 2026-09-18
> **Maintained By:** Claude Cowork / Arena.ai (Game Planner · Designer · UX · Researcher · Documentation Manager · Coordinator)
> **Single Source of Truth:** GitHub
> **Implementation Engineer:** Cursor AI / Claude Code · **Asset Creation:** ART/ASSET AI or human artist · **Final Authority:** the owner

---

## 0. ⚠️ CONCEPT PROVENANCE — READ THIS FIRST

The design content in this document was **recovered from the worked example built into the starter template** that was uploaded to `main` (commit `259a51c`, files `ai/*.md`). The template's own `PROJECT.md` left the concept fields as bracketed placeholders (`[Working Title / Game Name]`, `[One-sentence pitch…]`), so the agent has **not** treated that example as an approved concept.

It is therefore recorded here as **CANDIDATE CONCEPT A — a tactical RPG**, with the research, structure and reconciliation already done so that approval is one message, not a project.

**Every creative specific below is 🔵 PROPOSAL, not decision.** See `DECISIONS.md` → **D-01a** to confirm or redirect.

> **If the tactical RPG is your game** → say so, and it is locked and Milestone 1 can be scoped the moment the engine (D-02) is chosen.
> **If your real concept is different** → send it, and this document is replaced. Nothing is wasted: the framework, conventions, web-platform requirements and asset pipeline all survive a concept change.

---

## 0.1 Status vocabulary used across `/ai`

| Marker | Meaning |
|---|---|
| ✅ **LOCKED** | Owner-approved. Implementation may build against it. |
| 🔵 **PROPOSAL** | Written by the agent from the template's example or from research. **Not buildable until approved.** |
| ⏳ **OPEN** | Owner decision required. Nothing downstream may be assumed. |
| 🚧 **IN PROGRESS** · ⚠️ **BLOCKED** | Self-explanatory |

**Authority rule:** the owner is the final authority on **game concept · gameplay direction · scope · visual direction · story · characters · major mechanics · monetization · platform · release**. The agent never decides these silently.

---

## 1. Executive Summary

| Field | Value | Status |
|---|---|---|
| **Game Title** | `Veilrot` (working title, taken from the repository name — no creative meaning assigned yet) | 🔵 |
| **High Concept** | A squad-based **isometric tactical RPG**: command a small band of heroes across grid battlefields where elevation, facing and job-class synergies decide the fight. | 🔵 |
| **Inspirational References** | *Final Fantasy Tactics* (job system, CT turn queue, height advantage) · *Tactics Ogre* · *Into the Breach* (clarity of tactical information) · *Fell Seal: Arbiter's Mark* (modern indie FFT-like) | 🔵 |
| **Target Audience** | Mid-core strategy and tactical-RPG players; players who enjoy squad-building, build-crafting and puzzle-like combat positioning | 🔵 |
| **Target Platform(s)** | ✅ **Browser-first** (desktop web → mobile web → Android app) — **DEC-004**, owner-stated | ✅ |
| **Target Release Date** | ⏳ OPEN — needs a scope ceiling (D-09). The template suggested "MVP in 3 weeks"; that is an example, not an estimate. | ⏳ |

---

## 2. Core Fantasy & Player Experience

- **Core Fantasy** 🔵 — *"A commander leading a small band of heroes through desperate, tightly-won battles where position, timing and preparation matter more than reflexes."*
- **Key Emotional Beats** 🔵 — tactical satisfaction from a plan landing · tension from permadeath-style stakes · pride in squad build-craft · the "one more turn" pull.
- **Visual Aesthetic** 🔵 — 16-bit SNES-era pixel art, isometric grid, readable silhouettes. *(A production-cost decision, not just taste — see `ASSET_PIPELINE.md` §6 and D-08.)*
- **Audio Aesthetic** 🔵 — orchestral/neoclassical score; crisp, punchy physical combat SFX.

**Agent's note on the fantasy:** the emotional core of this genre is *legibility* — the player must always be able to see why a plan will work before committing to it. That has direct requirements consequences (`REQ-UI-*`), and it is the single most common reason indie tactical RPGs feel bad. Recommended as **design pillar #1**, subject to owner approval.

---

## 3. Technology Stack & Engine Selection

| Item | Value |
|---|---|
| **Game Engine** | ⏳ **OPEN — owner decision D-02.** Shortlisted for browser-first delivery in `ARCHITECTURE.md` §1 |
| **Programming Language** | Depends on engine: TypeScript (Phaser) or GDScript (Godot) |
| **Version Control** | Git / GitHub (single source of truth) |
| **Target Framerate** | 60 FPS target (turn-based game → comfortably achievable even on mobile browsers) |
| **Save Storage** | ✅ Browser storage under **DEC-004**: IndexedDB/localStorage + **export/import save file** (browser storage is evictable — never promise permanence) |

**Engine constraint introduced by DEC-004:** the engine must produce small, fast-loading browser builds that also run on mobile browsers. See `ARCHITECTURE.md` §1 for the measured trade-offs. **The agent does not choose this.**

---

## 4. Scope & Delivery Strategy

> ⚠️ **Scope discrepancy found in the uploaded template — needs an owner ruling (see D-09).**
> The template's `PROJECT.md` §4 states full release = **15 campaign levels, 8 job classes, dual-classing, boss fights**.
> The template's `MILESTONES.md` M4 states **4 job classes and 5 campaign stages**.
> Both cannot be the plan. This section records the discrepancy rather than silently picking one.

| Scope tier | Content | Status |
|---|---|---|
| **MVP (Vertical Slice)** | 1 battlefield, 2 hero units vs 2 enemies, full combat resolution, title screen, victory/defeat flow | 🔵 |
| **Milestone 3 "polished demo"** | 1 fully dressed stage, complete HUD, audio, art, 5-minute playable demo | 🔵 |
| **Milestone 4 content** | `MILESTONES.md` says 4 job classes / 5 stages — `PROJECT.md` implies 8 / 15 | ⏳ **conflicting** |
| **Full Release** | ⏳ OPEN — to be set as one number with D-09 | ⏳ |
| **Post-Launch / Deferred** | Endless/skirmish mode · PvP · modding API · localisation · additional jobs | ⏳ |

**Coordinator's recommendation:** for a first release, **5–6 stages and 4–6 job classes** is a realistic and satisfiable scope for this genre; 15 stages and 8 classes with dual-classing is a multi-year content commitment. The owner should set one number and let `FEATURES.md` and `MILESTONES.md` be pruned to fit it.

---

## 5. Development Governance

| Role | Entity | Responsibility |
|---|---|---|
| **Creative Director / Final Approver** | **Owner (you)** | All major decisions, art approval, playtesting, milestone sign-off |
| **Game Planner · Designer · UX · Researcher · Docs Manager · Coordinator** | **Claude Cowork / Arena.ai** | Turns the idea into an unambiguous plan; maintains `/ai`; writes task cards. **Does not write production code.** |
| **Implementation Engineer** | **Cursor AI / Claude Code** | Implements task cards atomically, runs tests, commits |
| **Asset Creator** | **ART/ASSET AI or human artist** | Produces assets to the 10-point specs in `ASSET_PIPELINE.md`, delivering into `/assets/approved/` |
| **Source of Truth** | **GitHub** | If it is not in the repository, it does not exist |

**Workflow:** `PLAN → APPROVE → DOCUMENT → TASKS → CODE`. The agent proposes at a high level, waits for approval, then details it. Task cards are written only for the currently active milestone.

---

## 6. Documentation Map

| File | Owns |
|---|---|
| `PROJECT.md` | Vision, fantasy, scope, governance (this document) |
| `PRODUCT_REQUIREMENTS.md` | Core loop, numbered requirements (`REQ-*`), NFRs, MVP acceptance |
| `UX_UI.md` | Screen flow, HUD, design tokens, input, accessibility |
| `ARCHITECTURE.md` | Engine options, systems, grid/CT/save architecture, web requirements |
| `FEATURES.md` | Stats, jobs, combat math, AI behaviour |
| `MILESTONES.md` | M1–M6 roadmap with completion criteria |
| `CURRENT_STATE.md` | **Live dashboard + the active task cards** |
| `DECISIONS.md` | Decision log (ADR) + pending owner-decision register |
| `CODING_RULES.md` | Mandatory rules for the implementer |
| `QA_TEST_PLAN.md` | Test strategy, playtest matrix, bug triage, release gate |
| `ASSET_PIPELINE.md` | 10-point asset specs, registries, approval workflow |
| `CLAUDE.md` / `.cursorrules` | Runtime instructions for the implementer |

---

## 7. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Charter created (initial scaffolding version) | Agent |
| 2026-09-18 | **Reconciled with the uploaded starter template.** Preserved the template's structure (§1–§5 headings) and adopted its conventions: `REQ-*` numbering, `/assets/approved|mock|raw/`, task cards in `CURRENT_STATE.md`, ADR-style `DECISIONS.md`. The template's worked example is recorded as **Candidate Concept A** throughout, explicitly provisionally. Platform locked to browser-first (DEC-004). Recorded the **scope discrepancy** between the template's `PROJECT.md` and `MILESTONES.md`. | Agent |
