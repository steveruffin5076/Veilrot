# DECISIONS.md — Decision Log & Pending Register

**Purpose:** A single, auditable record of every decision that shapes Veilrot. Nothing in `/ai` is authoritative until it appears here as ✅ LOCKED.

**Authority rule:** Decisions marked `OWNER` are made only by the project owner. The AI agent may write `PROPOSAL` entries; a proposal **never** becomes binding until the owner approves it and it is flipped to ✅ LOCKED.

---

## 1. Decision record format

```
### DEC-### — <short title>
- **Date:** YYYY-MM-DD
- **Status:** ✅ LOCKED | 🔵 PROPOSAL | ❌ REJECTED | 🔁 SUPERSEDED BY DEC-###
- **Authority:** OWNER | AGENT PROPOSAL
- **Decision:** <one sentence, unambiguous>
- **Context / why:** <the problem this solves>
- **Alternatives considered:** <and why rejected>
- **Consequences / impact:** <which docs, features, tasks, assets are affected>
- **Revisit trigger:** <what would make us reopen this, or "none">
```

**Rules**

1. Decisions are append-only. To change one, add a new record and mark the old one 🔁 SUPERSEDED.
2. Any decision that touches concept, gameplay direction, scope, visual direction, story, characters, major mechanics, monetization, platform, or release is **OWNER** by default. The agent must not pre-fill it.
3. Every decision lists its document impact so the coordinator can update `CURRENT_STATE.md`.

---

## 2. Decision log

*No decisions have been locked yet.*

---

## 3. Pending decision register — BLOCKING

These are the decisions that must be resolved before downstream documentation can be completed or before Claude Code can start Milestone 1. Each is an **OWNER DECISION**.

Priority order matters: `D-01` and `D-02` unblock the most work.

| ID | Decision | Why it matters / what it blocks | Options the agent has researched | Status |
|---|---|---|---|---|
| **D-01** | **Game concept intake** | Blocks *everything*: all 11 docs, the feature register, and every task card. There is currently no concept document in the repo. | Owner supplies the concept text (paste in chat or commit `/ai/CONCEPT_INTAKE.md`) | ⏳ OPEN |
| **D-02** | **Engine / tech stack** | Blocks `ARCHITECTURE.md`, project scaffolding, CI, the asset import pipeline and Milestone 1 entirely. | See `ARCHITECTURE.md` § Engine options for the researched comparison table — recommendation pending owner review | ⏳ OPEN |
| **D-03** | **Target platform(s)** | Determines input scheme, UI scale, performance budget, certification requirements, store pipeline, and monetization legality. | PC (Steam/itch) · Mobile (iOS/Android) · Web · Console · multi-platform | ⏳ OPEN |
| **D-04** | **Genre & reference "comp" game(s)** | Sets player expectations, the core loop shape, and the marketing positioning. | Owner to name 1–3 reference games | ⏳ OPEN |
| **D-05** | **Core fantasy & design pillars** | Everything downstream must serve these. Agent will draft pillars from the concept, then the owner approves or rewrites. | Agent drafts after intake | ⏳ OPEN |
| **D-06** | **Core gameplay loop** | The 30-second loop, the session loop, and the long-term loop. Blocks `PRODUCT_REQUIREMENTS.md` PR-1xx. | Agent drafts 3 loop variants for owner selection | ⏳ OPEN |
| **D-07** | **Camera / perspective** | Determines art production cost, level design method, and technical rendering approach. | First-person · Third-person · Top-down · Side-on 2D · Isometric · Fixed-camera | ⏳ OPEN |
| **D-08** | **Visual direction & art style** | Drives the entire `ASSET_PIPELINE.md` budget (asset count, resolution, animation cost) — the single biggest cost driver in the project. | Agent will present 3 style options with cost implications after intake | ⏳ OPEN |
| **D-09** | **MVP scope ceiling** | Protects the release date. Must be expressed in numbers (features, levels, hours, asset count). | Agent proposes tiers (Lean / Standard / Ambitious) with time estimates | ⏳ OPEN |
| **D-10** | **Monetization model** | Affects store choice, platform rules, save design, and whether the game is free. | Premium · Premium + DLC · Free + cosmetic · Free + ads · TBD-later | ⏳ OPEN |
| **D-11** | **Narrative delivery** | Determines writing workload and whether a writer is needed. | None · Environmental · Text-only · Voiced · Cutscenes | ⏳ OPEN |
| **D-12** | **Multiplayer requirement** | Co-op or PvP multiplies netcode, testing, and infrastructure cost. Must be decided early because it is expensive to retrofit. | Single-player only · Local co-op · Online co-op · Async/social features | ⏳ OPEN |
| **D-13** | **Target age rating & audience** | Constrains content, art, and store placement. | Everyone · Teen · Mature | ⏳ OPEN |
| **D-14** | **Localization languages** | Affects from day one: text systems, font atlas, UI layout for text expansion, string tables. | English only · EN + N languages · TBD | ⏳ OPEN |
| **D-15** | **Release target & format** | Sets milestone durations and the content cutoff. | Steam Early Access · Full 1.0 · Demo-first · Vertical-slice pitch | ⏳ OPEN |

---

## 4. Non-blocking / deferred register

Decisions that can safely wait but are logged so they are not forgotten.

| ID | Decision | Earliest milestone it matters | Status |
|---|---|---|---|
| D-16 | Save system: single slot vs multiple | Vertical Slice | ⏳ OPEN |
| D-17 | Difficulty modes / accessibility scope | Content Expansion | ⏳ OPEN |
| D-18 | Steam page, trailer, capsule art timing | Polish / Release | ⏳ OPEN |
| D-19 | Analytics / telemetry (and privacy stance) | Content Expansion | ⏳ OPEN |
| D-20 | Mod support | Post-launch | ⏳ OPEN |

---

## 5. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. Pending register seeded with 15 blocking + 5 deferred owner decisions. No decisions locked. | Agent |
