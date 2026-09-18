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

### DEC-001 — Platform: web browser first (desktop), then mobile browser, then Android
- **Date:** 2026-09-18
- **Status:** ✅ LOCKED
- **Authority:** OWNER (stated directly by the owner in the intake interview)
- **Decision:** Veilrot ships as a **browser game**: desktop web browsers are the primary target; mobile web browsers are the second target; packaging for **Android** follows from the browser version.
- **Context / why:** Owner's stated intent — build for PC web browsers first, then support mobile browsers, then convert to an Android app.
- **Alternatives considered:** Native PC (Steam/itch) · native mobile · console. Not chosen by the owner.
- **Consequences / impact:**
  - **Engine (D-02) is now constrained.** Web export quality and **build size** become first-class selection criteria, because download size and time-to-first-play decide whether a browser player stays. Unity's WebGL export is the weakest fit here (largest builds, and notably poor on *mobile* web). Godot 4 exports only GDScript to web and ships ~15–50 MB minimum. Web-native stacks (Phaser, Three.js/Babylon) and Defold have by far the smallest payloads.
  - **Input (UX_UI §5)** must support keyboard+mouse **and** touch from early on, and the UI must scale between desktop and phone screens.
  - **Performance budgets (NFR)** must be set against *mobile* browser hardware, not the owner's desktop — the weakest target defines the budget.
  - **Audio** cannot autoplay in browsers; every audio start needs a user-gesture unlock (see `ARCHITECTURE.md` §11).
  - **Saving** must use browser storage (localStorage/IndexedDB) with an export/import fallback, because browser storage can be cleared. This is a *save-data-loss risk* no native platform has.
  - **Monetization (D-10)** is now restricted to web-viable models: premium via itch.io/own site, ads via web portals, or Play Billing for the Android wrapper. Steam-style premium is no longer available without a separate native port.
  - **Android conversion** introduces a new decision (D-23 below) and a **schedule risk**: Google Play's minimum-functionality policy and its 2026 closed-testing requirement (see D-23).
  - `UX_UI.md`, `ARCHITECTURE.md`, `PRODUCT_REQUIREMENTS.md` and `QA_TEST_PLAN.md` all inherit a "test on real mobile browsers" obligation.
- **Revisit trigger:** if the Android version is the main commercial target from day one, browser-first may be the wrong sequencing; reopen if that becomes the intent.

---

---

## 3. Pending decision register — BLOCKING

These are the decisions that must be resolved before downstream documentation can be completed or before Claude Code can start Milestone 1. Each is an **OWNER DECISION**.

Priority order matters: `D-01` and `D-02` unblock the most work.

| ID | Decision | Why it matters / what it blocks | Options the agent has researched | Status |
|---|---|---|---|---|
| **D-01** | **Game concept intake** | Blocks *everything*: all 11 docs, the feature register, and every task card. There is currently no concept document in the repo. | Owner supplies the concept text (paste in chat or commit `/ai/CONCEPT_INTAKE.md`) | ⏳ OPEN |
| **D-02** | **Engine / tech stack** | Blocks `ARCHITECTURE.md`, project scaffolding, CI, the asset import pipeline and Milestone 1 entirely. **Now constrained by DEC-001: the engine must export small, fast-loading browser builds that also work on mobile browsers.** | See `ARCHITECTURE.md` §1 — rewritten for web-first with build-size data. Agent recommendation: **Phaser 4** for 2D (`~200 KB–2 MB` builds) or **Godot 4** if an editor-based workflow is wanted (`15–50 MB`); **Unity is discouraged** for this target (weak mobile-web support). Owner decides. | ⏳ OPEN |
| ~~D-03~~ | ~~Target platform~~ | — | **✅ RESOLVED by DEC-001:** browser-first (desktop web → mobile web → Android). | ✅ LOCKED |
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
| **D-23** | **Android packaging method** — TWA vs Capacitor (detail below) | Vertical Slice — **register the Play Console app early** | ⏳ OPEN |
| **D-24** | **Web distribution: where does the game live?** itch.io · own domain · web game portals (Poki, CrazyGames, Newgrounds) · several | Core Playable Loop — portals impose SDK, ad and file-size rules | ⏳ OPEN |
| **D-25** | **Mobile browser support scope** — which devices/OS versions must run it | Core Playable Loop — sets the performance floor | ⏳ OPEN |
| **D-26** | **Browser storage / save-loss policy** — localStorage vs IndexedDB, cloud sync, export-import saves | Vertical Slice | ⏳ OPEN |
| D-16 | Save system: single slot vs multiple | Vertical Slice | ⏳ OPEN |
| D-17 | Difficulty modes / accessibility scope | Content Expansion | ⏳ OPEN |
| D-18 | Store page, trailer, capsule/key art timing | Polish / Release | ⏳ OPEN |
| D-19 | Analytics / telemetry (and privacy stance) | Content Expansion | ⏳ OPEN |
| D-20 | Mod support | Post-launch | ⏳ OPEN |

### D-23 detail — Android packaging (owner decision, flagged with two real risks)

Both paths wrap the same browser build.

| | **Trusted Web Activity (TWA)** | **Capacitor** |
|---|---|---|
| Mechanism | Wraps the live URL inside the device's Chrome | Bundles the web build in a native WebView shell |
| App size | ~800 KB | ~4 MB |
| Requires | HTTPS + web manifest + **service worker** + `assetlinks.json` | A working HTTPS build (bundling the build makes offline possible too) |
| Native APIs | Browser APIs only | Native plugins: billing, haptics, splash screen, status bar |
| Google Play policy 4.3 "minimum functionality" risk | **Higher — a TWA without a service worker is treated as a thin wrapper and can be rejected** | Lower |
| iOS later | Possible but fiddly | Same project supports iOS |

**⚠️ Schedule risk the owner should know now:** Google Play requires new **personal** developer accounts to run a **closed test with at least 12 testers for 14 continuous days** before production access. That is calendar time, not work time, and it cannot be compressed.
**Mitigation:** register the Play Console app and start the closed test **during Milestone 4**, in parallel with content production — not at release.

**Agent recommendation (not a decision):** **Capacitor** — it removes the thin-wrapper rejection risk, supports bundling (so the Android build works offline), and exposes native billing later without changing the web build. Choose TWA only if the smallest possible install size outweighs those.

---

## 5. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. Pending register seeded with 15 blocking + 5 deferred owner decisions. No decisions locked. | Agent |
| 2026-09-18 | **DEC-001 locked** (platform = browser-first → mobile web → Android). D-03 resolved. D-02 re-scoped for web constraints. Added D-23 (Android packaging), D-24 (web distribution), D-25 (mobile browser scope), D-26 (browser storage/save loss). | Agent |
