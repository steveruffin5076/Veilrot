# PRODUCT_REQUIREMENTS.md

**Purpose:** The contract between design and implementation. If a behaviour is not written here (or in a doc it references), Claude Code must not invent it — it must raise a question.

**Status:** ⚠️ BLOCKED on concept intake (see `PROJECT.md` §2 and `DECISIONS.md` D-01). The numbering scheme, traceability rules and acceptance criteria conventions below are **established and ready**; the requirement content is ⏳ OPEN.

---

## 1. Product definition

| Field | Value |
|---|---|
| Vision statement (one sentence) | ⏳ OPEN |
| Elevator pitch (three sentences) | ⏳ OPEN |
| Genre | ⏳ OPEN |
| Reference / comp titles | ⏳ OPEN |
| Player fantasy | ⏳ OPEN |
| What makes it different | ⏳ OPEN |
| Platform(s) | ⏳ OPEN (D-03) |
| Business model | ⏳ OPEN (D-10) |
| Target session length | ⏳ OPEN |
| Target total playtime (first completion) | ⏳ OPEN |
| Target age rating | ⏳ OPEN (D-13) |

---

## 2. Target player

> ⏳ OPEN. To be written after intake, in this structure:

```markdown
### Persona A — <name>
- **Who they are:** age band, gaming background, time available per session
- **What they want from this game:** the emotional payoff
- **What will make them bounce:** friction points we must remove
- **Comparable games they already play:** 2–3 titles
- **Implication for design:** 3–5 concrete, testable consequences
```

Personas are only useful if they change a decision. Each persona must end with an "implication for design" that names a requirement ID.

---

## 3. Functional requirements

**Conventions**

- ID format: `PR-<category><number>` — categories: `1xx` Core Loop · `2xx` Systems & Combat · `3xx` Progression · `4xx` Content/Levels · `5xx` Narrative · `6xx` UI/UX · `7xx` Save & Settings · `8xx` Audio · `9xx` Platform/Meta.
- Every requirement must contain: **Behaviour** (what the system does), **Trigger** (when), **Acceptance criteria** (binary, testable), **Traces to** (feature ID from `FEATURES.md`), **Verified by** (test ID from `QA_TEST_PLAN.md`).
- Wording rules: use "must" for hard requirements, "should" for expected behaviour, "may" for optional. No vague words (*fast*, *fun*, *good*) — use numbers.

### 3.1 Core loop — `PR-1xx`

⏳ OPEN — blocked on D-06.

### 3.2 Systems & combat — `PR-2xx`

⏳ OPEN — blocked on concept intake.

### 3.3 Progression — `PR-3xx`

⏳ OPEN — blocked on concept intake.

### 3.4 Content & levels — `PR-4xx`

⏳ OPEN — blocked on D-09 (scope ceiling).

### 3.5 Narrative — `PR-5xx`

⏳ OPEN — blocked on D-11.

### 3.6 UI / UX — `PR-6xx`

⏳ OPEN — see `UX_UI.md` for the screen inventory this will be built from.

### 3.7 Save, settings & accessibility — `PR-7xx`

⏳ OPEN (save-slot scope pending D-16).

### 3.8 Audio — `PR-8xx`

⏳ OPEN.

### 3.9 Platform / meta — `PR-9xx`

⏳ OPEN — blocked on D-03 and D-10.

---

## 4. Non-functional requirements

These are largely platform-independent conventions and can be **locked early**, because they protect quality regardless of what the game turns out to be. Marked 🔵 PROPOSAL until the owner approves them.

| ID | Requirement | Target | Status |
|---|---|---|---|
| NFR-01 | Frame rate | 60 fps on target hardware, with a documented minimum-spec tier at 30 fps | 🔵 PROPOSAL |
| NFR-02 | Frame time budget | 16.6 ms total; render ≤ 10 ms, game logic ≤ 4 ms | 🔵 PROPOSAL |
| NFR-03 | Cold boot to main menu | ≤ 5 s on target hardware | 🔵 PROPOSAL |
| NFR-04 | Load time between playable spaces | ≤ 8 s, or hidden behind a skippable transition | 🔵 PROPOSAL |
| NFR-05 | Memory ceiling | To be set once platform is chosen (D-03) | ⏳ OPEN |
| NFR-06 | Build size | To be set once platform is chosen (D-03) | ⏳ OPEN |
| NFR-07 | Input latency | Input-to-visual response ≤ 2 frames | 🔵 PROPOSAL |
| NFR-08 | Stability | Zero crash-on-boot, zero progression-blocking bugs at release gate | 🔵 PROPOSAL |
| NFR-09 | Save integrity | No save corruption; versioned schema with forward-migration path | 🔵 PROPOSAL |
| NFR-10 | Accessibility | Remappable controls, subtitle support if voiced, minimum text-size floor, no colour-only signalling | 🔵 PROPOSAL |
| NFR-11 | Localization readiness | All player-facing strings externalised from day one, no hard-coded text | 🔵 PROPOSAL |
| NFR-12 | Code quality | Compiles with zero errors and zero warnings; all task-card tests pass | 🔵 PROPOSAL |

**NFR-11 note:** this is cheap now and expensive later. It should be locked before Milestone 1 ends regardless of D-14.

---

## 5. MVP definition

> ⏳ OPEN — blocked on D-09.

The MVP section will state, in numbers: how many levels/areas, how many mechanics, how many enemy types, how many items, how much narrative, and exactly what is excluded. **Anything not listed here is out of MVP by definition**, even if it appears in `FEATURES.md` as a later-milestone feature.

### Explicitly NOT in MVP

⏳ OPEN — to be filled at the same time as the MVP definition. This list is as important as the MVP list; it is the project's defence against scope creep.

---

## 6. Definition of Done (applies to every requirement)

A requirement is Done only when **all** of these are true:

1. Implemented in code on a branch, reviewed, and merged.
2. Behaviour matches the written acceptance criteria, verified by a QA test case.
3. No placeholder assets remain that the requirement depends on — *unless* the requirement is explicitly labelled mock-first in `ASSET_PIPELINE.md`, in which case a tracked asset ID exists.
4. Performance budget (NFR) still met.
5. `CURRENT_STATE.md` updated by the coordinator.
6. No new warnings, no new TODOs without a task-card reference.

---

## 7. Open questions

| # | Question | Blocks | Owner answer |
|---|---|---|---|
| Q-01 | Where is the concept document? | All documentation | ⏳ |
| Q-02 | Engine / tech stack? | Milestone 1 | ⏳ (D-02) |
| Q-03 | Platform? | Architecture, UI scale, NFR-05/06 | ⏳ (D-03) |
| Q-04 | MVP scope ceiling? | Content requirements | ⏳ (D-09) |
| Q-05 | Single-player or multiplayer? | Architecture, netcode cost | ⏳ (D-12) |
| Q-06 | Localization from day one? | String systems | ⏳ (D-14) |

---

## 8. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. Requirement conventions, NFR draft and Definition of Done established; all product content ⏳ OPEN pending intake | Agent |
