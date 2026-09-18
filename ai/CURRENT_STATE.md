# CURRENT_STATE.md — Live Project Dashboard

> **Read this first.** It is the single answer to "where are we?" Updated by the coordinator at the end of every work session.

**Snapshot taken:** 2026-09-18
**Repository:** `steveruffin5076/Veilrot`
**Working branch:** `arena/01a0b39b-veilrot` · **PR:** [#1](https://github.com/steveruffin5076/Veilrot/pull/1) (draft, awaiting owner)
**Default branch:** `main` (contains README only)

---

## 1. Headline status

| Field | Value |
|---|---|
| **Project phase** | **INTAKE — PRE-PRODUCTION** |
| **Active milestone** | **None.** Milestone 1 (Foundation) cannot start until D-02 (engine) is chosen. |
| **Blocking issue** | ⚠️ **The owner's game concept document has not been received.** The owner selected "I'll re-upload" — waiting on the file. |
| **Resolved this session** | ✅ **DEC-001 — platform is now known**: browser-first (desktop web → mobile web → Android). This unblocked the engineering research and re-scoped five documents. |
| **Overall health** | 🟡 Documentation and platform direction ready; no game defined yet; no code; no assets. |
| **Next action** | **Owner re-uploads the concept file** (or pastes the text). Then D-02: pick the engine from the web-scoped shortlist. |

---

## 2. Completed work

| Date | Item | Evidence |
|---|---|---|
| 2026-09-18 | Full repository inspection: source, history, branches, GitHub metadata, issues, PRs | Findings in §2.1 |
| 2026-09-18 | Documentation system established — all 11 `/ai` documents with formats, conventions, gates and checklists | `/ai/*.md` |
| 2026-09-18 | Asset pipeline scaffolding: 10-point spec template, registry, mock-asset protocol, folder taxonomy | `ASSET_PIPELINE.md`, `/assets/` |
| 2026-09-18 | Task-card format defined for Claude Code | `/ai/tasks/README.md` |
| 2026-09-18 | Decision framework created: 15 blocking + 5 deferred owner decisions | `DECISIONS.md` §3–4 |
| 2026-09-18 | Six-milestone plan with measurable exit criteria | `MILESTONES.md` |
| 2026-09-18 | **DEC-001 locked: platform = browser-first** — owner decision recorded with consequences | `DECISIONS.md` §2 |
| 2026-09-18 | **Web-platform research completed**: engine build-size/load-time comparison, mobile-web performance caveats, TWA vs Capacitor for the Android step, Google Play closed-testing requirement | `ARCHITECTURE.md` §1, `DECISIONS.md` D-23 |
| 2026-09-18 | Five documents re-scoped for the browser target: architecture web requirements (§11), 10 new web NFRs, 11 web test obligations, browser-first asset format rules, mobile/touch UX requirements | see §5 change list |
| 2026-09-18 | Concept intake template created for the owner | `CONCEPT_INTAKE.md` |

### 2.1 Repository inspection findings (baseline, unchanged)
- `main` @ `aedd415` contains one file: `README.md` = `# Veilrot`.
- No `/ai`, no `/assets`, no `/src`, no tests, no build config, no tags.
- No branches other than `main` and this session's branch; no issues; no PRs; no repo description or topics.

---

## 3. Current work

**Nothing is in progress.** The project is correctly halted at intake: the owner's concept has not arrived, and per the project rules the agent does not invent game content.

---

## 4. Remaining tasks

### 4.1 Blocked on the owner — ordered by how much they unblock

| # | Task | Blocked by | Ref |
|---|---|---|---|
| T-01 | **Ingest and structure the game concept** | Waiting on the re-uploaded file | D-01 |
| T-02 | **Choose the engine** from the web-scoped shortlist | Owner decision — agent recommends Phaser 4 (2D) / Godot 4 (editor workflow) | D-02 |
| T-03 | Choose visual direction / art style | T-01 | D-08 |
| T-04 | Set MVP scope ceiling in numbers | T-01 | D-09 |
| T-05 | Draft design pillars & core loop for approval | T-01 | D-05, D-06 |
| T-06 | Decide web distribution (itch.io / own domain / portals) | Owner decision | D-24 |
| T-07 | Set the mobile device floor (drives the perf budget) | Owner decision | D-25 |
| T-08 | Decide monetization, release format, multiplayer, localization, rating | Owner decisions | D-10…D-15 |

### 4.2 Ready to execute the moment the concept lands

| # | Task | Will produce |
|---|---|---|
| T-09 | Restate the concept as a structured design discussion | a proposal document for the owner's approval — **no decisions made** |
| T-10 | Draft design pillars + 3 core-loop variants | approval-ready options |
| T-11 | Write `PRODUCT_REQUIREMENTS.md` §1–3, `UX_UI.md` §2–6, `FEATURES.md` register | PR/FEAT drafts |
| T-12 | Finalise `ARCHITECTURE.md` §3 for the chosen engine | system modules + folder layout |
| T-13 | Write Milestone 1 Claude Code task cards | `/ai/tasks/M1-*.md` |
| T-14 | Write the full 10-point asset spec set for MVP | `ASSET_PIPELINE.md` registry |

### 4.3 Not yet reachable
Milestones 2–6 task cards · timeline estimate · QA test cases · store/portal assets.

---

## 5. Document change list from DEC-001

| Document | What changed |
|---|---|
| `DECISIONS.md` | DEC-001 locked; D-03 resolved; D-02 re-scoped; added D-23 (Android packaging), D-24 (distribution), D-25 (mobile scope), D-26 (save-loss policy) |
| `ARCHITECTURE.md` | §1 rewritten around build size and mobile-web performance (Unity now discouraged); `src/platform/` + `public/` added to the layout; **§11 web-platform requirements** added (audio unlock, save eviction, DPI/canvas, tab lifecycle, payload budget, caching & deploy, mobile perf floor, PWA) |
| `PRODUCT_REQUIREMENTS.md` | Platform recorded; **NFR-13…NFR-22** added (payload ≤ 5 MB proposed, time-to-first-play, progress feedback, touch, mobile perf floor, tab lifecycle, save durability, browser matrix, offline/caching, build identification) |
| `UX_UI.md` | Every screen now owes a desktop **and** a touch layout; **§9.5** web/mobile UX requirements (touch targets, orientation, safe areas, mobile viewport, audio gate, text input) |
| `QA_TEST_PLAN.md` | New L5b browser-matrix level; **§2.5 web test obligations W-01…W-11**; web smoke test; web + Android items on the release gate |
| `ASSET_PIPELINE.md` | Web delivery formats mandated (WebP/AVIF, Opus/Vorbis, no shipped source files); per-asset size accounting against the payload budget |
| `MILESTONES.md` | M1 now requires a deployable HTTPS build + audio-unlock gate and early real-phone testing; M6 adds web deployment and the Play closed-testing window |

---

## 6. Blockers

| ID | Blocker | Severity | Impact | Resolution |
|---|---|---|---|---|
| B-01 | **Game concept not received** | 🔴 Critical | Blocks 100% of design and implementation work | Owner re-uploads the file or pastes the text |
| B-02 | Engine not chosen (D-02) | 🔴 Critical | Blocks Milestone 1, architecture, CI, asset import | Owner picks from the shortlist in `ARCHITECTURE.md` §1 |
| ~~B-03~~ | ~~Platform not chosen~~ | — | — | ✅ **Resolved — DEC-001** |

---

## 7. Missing assets

**No asset specs exist yet** — art direction is undefined until the concept arrives (D-08).

The asset *system* is ready: folder taxonomy, 10-point spec template, registry, approval workflow, and the mock/placeholder protocol (code loads by asset ID and substitutes an obvious procedural placeholder — **missing art never blocks development**).

---

## 8. Next recommended action

> ### ⛔ Blocking, in order:
>
> **1. The owner re-uploads the concept file.** (Or pastes the text into chat — fastest.)
> **2. The owner picks the engine (D-02).** Shortlist and reasoning in `ARCHITECTURE.md` §1:
>    - **Phaser 4 + TypeScript** — agent's lead recommendation if the game is 2D: ~200 KB–2 MB builds, sub-second load, best mobile-web performance, deploys to any static host.
>    - **Godot 4** — if an editor-based workflow matters, or the game is 3D: accepts 15–50 MB builds and multi-second loads. Web export is GDScript-only.
>    - **Unity is discouraged** for this target.
>
> ### Then the agent will, without further prompting:
> - restate the concept as a structured design discussion for approval;
> - draft pillars and three core-loop variants;
> - write the requirements, UX and feature-register drafts;
> - and produce the Milestone 1 task cards for Claude Code.
>
> **Two things the owner should decide early because they are calendar-bound, not work-bound:** where the game will live on the web (**D-24**) and the Android path (**D-23** — Google Play requires 12 testers for 14 continuous days on a closed track before production access for new personal accounts).

---

## 9. Metrics

| Metric | Value |
|---|---|
| Milestones complete | 0 / 6 |
| Locked decisions | 1 (DEC-001 platform) |
| Open blocking decisions | 2 (D-01 concept, D-02 engine) |
| Features registered / verified | 0 / 0 |
| Requirements written | 0 functional · 22 NFR drafts |
| Task cards written | 0 |
| Assets specified | 0 |
| Automated tests passing | 0 (no test harness yet) |

---

## 10. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Dashboard created. Project state: intake blocked pending owner's concept document. | Agent |
| 2026-09-18 | **DEC-001 recorded (browser-first)**; B-03 resolved; engine shortlist researched and re-scoped for web; five documents updated; new owner decisions D-23…D-26 registered. | Agent |
