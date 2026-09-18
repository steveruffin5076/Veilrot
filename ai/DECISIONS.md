# ARCHITECTURAL & CREATIVE DECISION LOG (ADR)

> **Maintained By:** Owner (Final Authority) & Claude Cowork / Arena.ai
> **Rule:** Every major decision is logged here to preserve historical context and prevent regression. Nothing in `/ai` is authoritative until it appears here as ✅ LOCKED.

---

## 1. Decision Record Format

- **DEC-ID:** Sequential identifier
- **Date:** YYYY-MM-DD
- **Decision:** What was chosen
- **Authority:** `USER_STATED` · `USER_APPROVED` · `PROPOSAL_ACCEPTED` · `AGENT_PROPOSAL` (not binding)
- **Status:** ✅ LOCKED · 🔵 PROPOSAL · ⏳ OPEN · ❌ REJECTED · 🔁 SUPERSEDED BY DEC-###
- **Context & Rationale:** why this over the alternatives
- **Consequences:** which systems, docs, features, tasks and assets are affected
- **Revisit trigger:** what would reopen this

**Authority rule:** any decision touching **game concept · gameplay direction · scope · visual direction · story · characters · major mechanics · monetization · platform · release** is the **owner's** by default. The agent must not pre-fill it.

---

## 2. Decision Log

### DEC-001 — Separation of concerns (planner ≠ implementer)
- **Date:** 2026-09-18 · **Authority:** `USER_APPROVED` (stated in the owner's master prompt) · **Status:** ✅ LOCKED
- **Decision:** Claude Cowork / Arena.ai is strictly designated for planning, game design, UX/UI, research and documentation management. Cursor AI / Claude Code is strictly designated for code implementation. GitHub is the single source of truth.
- **Context:** Prevent code duplication, lost context and tool confusion; the owner explicitly stated "You are NOT the main programmer."
- **Consequences:** The planner does not output production source code unless explicitly asked. Implementation work is defined as task cards (in `CURRENT_STATE.md` and `/ai/tasks/`).
- **Revisit trigger:** none.

### DEC-002 — Missing-art protocol (non-blocking development)
- **Date:** 2026-09-18 · **Authority:** `USER_APPROVED` · **Status:** ✅ LOCKED
- **Decision:** Lack of artwork or art-authoring tools will **never** block game logic, maths or engine implementation.
- **Context:** Media is created in parallel, often externally, by art AI or a human artist.
- **Consequences:** The implementer uses procedural geometry, flat-colour placeholders and asset-ID labels, and continues with maths, input, state machines and tests. Missing assets do not convert into blocked tasks.
- **Revisit trigger:** none.

### DEC-003 — Height advantage combat multiplier
- **Date:** 2026-09-18 · **Authority:** `USER_APPROVED` *(in the template; about a concept not yet confirmed)* · **Status:** ⚠️ PROVISIONAL
- **Decision:** Attacking from a higher elevation grants **+10% physical damage per elevation tier**; attacking uphill incurs a **−10% accuracy penalty**.
- **Context:** Encourages tactical positioning and vertical map exploration.
- **Consequences:** Grid tiles must track integer elevation (0,1,2,3) and the combat calculation must query tile height.
- **Status update:** condition satisfied — see DEC-006. Elevation combat maths applies. Still subject to the M2 balance pass.
- **Revisit trigger:** during the M2 balance pass.

### DEC-004 — Platform: browser-first (desktop web → mobile web → Android)
- **Date:** 2026-09-18 · **Authority:** `USER_STATED` (owner, in-session) · **Status:** ✅ LOCKED
- **Decision:** Veilrot ships as a **browser game**: desktop web browsers primary, mobile web browsers second, then an **Android** build derived from the browser version.
- **Context:** Owner's stated intent: "PC web browser first, then only mobile browser to convert to android."
- **Alternatives considered:** Native PC (Steam/itch) · native mobile · console. Not chosen.
- **Consequences:**
  - **Engine (D-02) is constrained:** the engine must produce small, fast-loading browser builds that also run on mobile browsers. Build size and mobile-web performance became first-class selection criteria. Unity is effectively excluded; Godot carries a 15–50 MB payload penalty; Phaser/Defold are the light options.
  - **Build size is now a design constraint**, not just a technical detail: a specified loading experience and an initial payload budget are required.
  - **Input** must support keyboard + mouse **and** touch **and** gamepad, with the UI scaling between desktop and phone.
  - **Performance budgets** are set by the weakest supported mobile device, not the owner's desktop.
  - **Audio** requires an explicit user-gesture unlock gate.
  - **Saving** must use evictable browser storage, with export/import as backup and support path. Save loss is a real risk no native platform has.
  - **Monetization** is restricted to web-viable models (premium via itch.io/own site, portal ads, or Play Billing on the Android wrapper).
  - **Android conversion** introduces D-23, and with it a **calendar-bound** Google Play requirement (12 testers / 14 continuous days for new personal accounts).
  - Documents updated: `ARCHITECTURE.md` §5, `PRODUCT_REQUIREMENTS.md` §3.2, `UX_UI.md` §9.5, `QA_TEST_PLAN.md` §2.5, `ASSET_PIPELINE.md`, `MILESTONES.md`.
- **Revisit trigger:** if the Android version becomes the primary commercial target from day one, browser-first sequencing is the wrong order.

### DEC-005 — Engine: Phaser 4 + TypeScript
- **Date:** 2026-09-18 · **Authority:** `USER_STATED` (owner, in-session) · **Status:** ✅ LOCKED
- **Decision:** Veilrot's engine is **Phaser 4 + TypeScript**.
- **Context:** Recommended option under DEC-004 (browser-first): native isometric tilemap support, ~0.2–2 MB builds, best mobile-web fit. Owner confirmed the recommendation directly rather than Godot 4.
- **Consequences:** **D-02 is resolved.** `ARCHITECTURE.md` §1.2 engine section, the M1 task cards' file paths (already written assuming a Phaser/TypeScript layout), and the "Common CLI commands" section of `CLAUDE.md` can now be finalised with real `npm`/`vite`/Phaser commands. Does **not** unblock execution on its own — **D-01a (game concept) is still ⏳ OPEN** and continues to block all M1 task cards per `CURRENT_STATE.md` §0.
- **Revisit trigger:** none.

### DEC-006 — Game concept: Candidate Concept A confirmed
- **Date:** 2026-09-18 · **Authority:** `USER_STATED` (owner, in-session) · **Status:** ✅ LOCKED
- **Decision:** **Candidate Concept A — the isometric tactical RPG — is Veilrot's game.** Owner: "Yes, the tactical RPG is confirmed — go with Candidate Concept A."
- **Context:** Resolves the single highest-priority blocker (D-01a). The concept was recovered from the starter template's worked example and held as unapproved pending this confirmation.
- **Consequences:** **D-01a is resolved.** With D-02 (DEC-005) also resolved, Milestone 1 task cards in `CURRENT_STATE.md` §2 are no longer `DRAFT — DO NOT EXECUTE` and may be implemented. `PROJECT.md`, `ARCHITECTURE.md`, `FEATURES.md`, `UX_UI.md`, `ASSET_PIPELINE.md` still carry 🔵 PROPOSAL markers on individual creative specifics (visual style, exact numbers, etc.) — those remain the coordinator's to resolve into ✅ LOCKED content; this decision locks the concept as a whole, not every number inside it. DEC-003 (height advantage) condition is satisfied.
- **Revisit trigger:** none.

---

## 3. Pending Decision Register — BLOCKING

Each is an **OWNER DECISION**. Ordered by how much work they unblock.

| ID | Decision | Blocks | Options / agent research | Status |
|---|---|---|---|---|
| ~~D-01a~~ | ~~Is Candidate Concept A (isometric tactical RPG) the game?~~ | **Everything.** The uploaded template had no concept — only a worked example. | Confirmed: the tactical RPG | ✅ **Resolved — DEC-006** |
| ~~D-02~~ | ~~Engine~~ | M1, architecture, CI, asset pipeline | **Phaser 4 + TypeScript** | ✅ **Resolved — DEC-005** |
| **D-09** | **Scope ceiling** — the template conflicts: `PROJECT.md` says 8 job classes / 15 levels; `MILESTONES.md` M4 says 4 classes / 5 stages | Content volume, save shape, M4 sizing, timeline | Agent recommends **5–6 stages / 4–6 jobs** for a first release | ⏳ |
| **D-06** | Re-confirm combat maths (damage formula, CT costs, +10%/tier height, facing bonuses) | M2 implementation | See `PRODUCT_REQUIREMENTS.md` §2.3 — all values are template examples | ⏳ |
| **D-07** | Camera & presentation: fixed isometric view? rotatable? zoom? | Art production, level design, rendering | Fixed iso (cheapest) · rotatable (4× art) · free camera | ⏳ |
| **D-08** | **Visual direction / art style** | `ASSET_PIPELINE.md` entire budget — biggest cost driver | 16-bit SNES pixel art (template's suggestion) · HD pixel · hand-painted 2D · low-poly 3D | ⏳ |
| **D-10** | Monetization | Store choice, portal rules, save design | Free · premium · ads (portals) · Play Billing · TBD-later | ⏳ |
| **D-11** | Narrative delivery | Writing workload; M3 cutscene | None · environmental · text-only · voiced | ⏳ |
| **D-12** | Multiplayer? | Architecture; netcode is expensive to retrofit | Single-player only (recommended) · local co-op · async | ⏳ |
| **D-13** | Age rating / content tone | Art and writing constraints | Everyone · Teen · Mature | ⏳ |
| **D-14** | Localisation | String systems — cheap now, expensive later | English only · EN + N · TBD | ⏳ |
| **D-15** | Release format | Milestone durations, content cutoff | Demo-first · full 1.0 · web portal launch | ⏳ |
| **D-23** | **Android packaging: TWA vs Capacitor** | Android path, Play Console timing | See §4 — agent recommends Capacitor | ⏳ |
| **D-24** | **Where the game lives on the web** | SDKs, ad integration, file-size limits | itch.io · own domain · portals (Poki/CrazyGames) · several | ⏳ |
| **D-25** | **Mobile device floor** | Perf budget, bundle budget, test matrix | e.g. "mid-range Android from 2021+, iOS Safari 16+" | ⏳ |
| **D-26** | Browser storage / save-loss policy | Save service implementation | IndexedDB + export/import (recommended) · cloud sync | ⏳ |

### Deferred (non-blocking)

| ID | Decision | Earliest it matters | Status |
|---|---|---|---|
| D-16 | Save slots: single vs multiple | M4 | ⏳ |
| D-17 | Difficulty modes / accessibility scope | M4 | ⏳ |
| D-19 | Analytics / telemetry + privacy stance | M4 | ⏳ |
| D-20 | Mod support | Post-launch | ⏳ |
| D-27 | Confirm 60 FPS target and 1280×720 internal resolution (template's example) | M1 | ⏳ |

---

## 4. D-23 detail — Android packaging (with the schedule risk)

| | **Trusted Web Activity (TWA)** | **Capacitor** |
|---|---|---|
| Mechanism | Wraps the live URL inside the device's Chrome | Bundles the web build in a native WebView shell |
| App size | ~800 KB | ~4 MB |
| Requires | HTTPS + web manifest + **service worker** + `assetlinks.json` | Working HTTPS build; can bundle assets |
| Native APIs | Browser APIs only | Native plugins (billing, haptics, splash, status bar) |
| Play policy 4.3 "minimum functionality" risk | **Higher — a TWA without a service worker is treated as a thin wrapper and can be rejected** | Lower |
| iOS later | Fiddly | Same project supports it |

**⚠️ Schedule risk the owner should know now:** Google Play requires new **personal** developer accounts to run a **closed test with ≥12 testers for 14 continuous days** before production access. That is calendar time, not work time.
**Mitigation:** register the Play Console app and start the closed test **during Milestone 4**, in parallel with content production — not at release.

**Agent recommendation (not a decision):** **Capacitor** — removes the thin-wrapper rejection risk, supports bundling (offline play), and exposes native billing later without changing the web build.

---

## 5. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Initial decision framework created | Agent |
| 2026-09-18 | **Reconciled with the template's decision log.** Adopted the template's ADR format and its three entries (preserved as DEC-001/002/003; DEC-003 marked ⚠️ PROVISIONAL pending D-01a). Platform decision renumbered to **DEC-004** to avoid collision. Pending register consolidated: 16 blocking + 5 deferred owner decisions, plus the D-23 Android packaging analysis. **No creative decisions made by the agent.** | Agent |
| 2026-09-18 | **DEC-005 recorded — owner chose Phaser 4 + TypeScript for D-02.** D-02 resolved and struck from the blocking register. **D-01a remains ⏳ OPEN and still blocks all M1 execution.** | Agent |
| 2026-09-18 | **DEC-006 recorded — owner confirmed Candidate Concept A (D-01a).** D-01a resolved. With D-02 also resolved, **Milestone 1 task cards are unblocked** for implementation. DEC-003 condition satisfied. | Agent |
