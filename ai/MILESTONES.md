# MILESTONES.md — Development Plan

**Purpose:** The road from empty repository to released game, in six gates. Each milestone is a *state the game must reach*, not a to-do list. Task cards live in `/ai/tasks/` and are written only for the **current** milestone.

**Status:** ⚠️ Milestone content is blocked on intake and on D-02 (engine). The milestone *structure*, *gates* and *exit criteria format* are established.

---

## 1. Rules of the milestone system

1. **One milestone active at a time.** The active milestone is recorded in `CURRENT_STATE.md`.
2. **No milestone begins before the previous one is signed off by the owner.** Sign-off is recorded in `DECISIONS.md`.
3. **Every milestone ends with a demonstrable build.** If it cannot be run and seen, it is not done.
4. **Task cards are written only for the current milestone** — never batch-write future milestones; the design will have moved by then.
5. **Cutting scope is allowed; extending a milestone is allowed; carrying unverified work forward is not.**

Each milestone below records: goal · deliverables · exit criteria · what it explicitly does *not* include.

---

## 2. Milestone 1 — Foundation

**Goal:** A running, empty, correctly-configured project with working documentation, asset pipeline, and CI. Nothing fun yet — and that is the point.

**Deliverables**
- Engine project created and committed (pending **D-02**).
- Repository structure in place per `ARCHITECTURE.md` §2 (`src/`, `assets/`, `/ai`, `tests/`).
- Project builds and runs on a clean machine from a fresh clone, by a documented one-command procedure.
- Boot → main menu → quit works end-to-end (placeholder menu, real state machine).
- Asset service loads by asset **ID** and substitutes mock placeholders when a file is missing.
- Debug overlay showing fps / frame time / build version.
- Automated test harness running at least one passing smoke test in CI.
- `CODING_RULES.md` conventions demonstrably applied to the first real code files.
- **Localization-ready string system (NFR-11) in place from the first string.**

**Exit criteria**
- [ ] Fresh clone → build → run, verified by someone other than the implementer.
- [ ] Zero errors, zero warnings.
- [ ] CI green on the default branch.
- [ ] Boot-to-menu within NFR-03.
- [ ] No hard-coded player-facing text anywhere.
- [ ] Owner sign-off recorded in `DECISIONS.md`.

**Not included:** any gameplay, any real art, any content.

---

## 3. Milestone 2 — Core Playable Loop

**Goal:** The smallest version of the game that can be played repeatedly and is still recognisably *this game*. Ugly is fine. Fun is mandatory.

**Deliverables**
- The primary player verb(s) implemented and tunable from data files.
- The core loop runs start → challenge → resolution → repeat without developer intervention.
- Fail state and recovery/retry path implemented.
- Win/complete state implemented.
- Placeholder everything else (art, audio, UI styling).
- Frame-time readout proving the loop stays inside the 16.6 ms budget under worst-case load.
- Automated tests for the loop's core math (deterministic, seeded RNG).
- **First honest playtest:** the owner plays it and answers — *is the core loop worth building a game around?* This is the project's biggest single risk and it is retired here, cheaply.

**Exit criteria**
- [ ] The loop can be played for 10 minutes without a crash or a soft-lock.
- [ ] Owner answers the "is this fun?" question in writing, in `DECISIONS.md`.
- [ ] All core tunables live in data files, verified by changing one without a recompile.
- [ ] Loop math covered by tests.
- [ ] Owner sign-off.

**Not included:** progression, real content volume, final art, narrative, polish.

---

## 4. Milestone 3 — Vertical Slice

**Goal:** One complete, polished-to-shippable-quality slice of the game: a single level/area/encounter, fully dressed, exactly as the final game will look and sound. This is the quality bar and the scope yardstick for everything after.

**Deliverables**
- One complete content unit at final quality: art direction locked, audio in, UI final, narrative (if any) in place.
- Progression system functioning within the slice.
- Save/load working for the slice.
- Settings, remap, accessibility basics from `UX_UI.md` §7 implemented.
- Full menu flow from `UX_UI.md` §2 implemented with all six UI states.
- Asset pipeline proven end-to-end: a real asset lands in `/assets`, is registered, and appears in-game **without a code change**.
- Performance verified at the slice's worst-case density.
- External playtest with at least one person who is not the owner — feedback captured in `QA_TEST_PLAN.md` §playtest protocol.

**Exit criteria**
- [ ] The slice looks and plays like the finished game, at small scale.
- [ ] Measured content-production cost per unit is known → this number sizes Milestone 4.
- [ ] Zero placeholder assets remain inside the slice (outside it, placeholders are fine).
- [ ] Owner sign-off.

**Not included:** content volume, extras, side systems, meta features.

---

## 5. Milestone 4 — Content Expansion

**Goal:** Turn one slice into a game. Multiply content at the quality and cost established in Milestone 3.

**Deliverables**
- All MVP content units produced (count pending **D-09**).
- All SHOULD-priority features from `FEATURES.md` implemented or cut with a decision record.
- Difficulty/accessibility options (pending **D-17**).
- Meta systems: achievements, stats, credits, licence compliance.
- Localization pass if required (**D-14**).
- Full playthrough completable start to finish by a first-time player without developer help.
- Regression suite covering all MUST features.

**Exit criteria**
- [ ] Complete playthrough, start to end, no blockers, by an external person.
- [ ] Content count matches the approved MVP definition, or the difference is an owner decision.
- [ ] All MUST features VERIFIED.
- [ ] Owner sign-off.

---

## 6. Milestone 5 — Polish / QA

**Goal:** Remove the friction, fix the bugs, and make it feel finished. No new features except where a feature is the fix.

**Deliverables**
- Bug burn-down to zero blockers and zero criticals; documented tolerance for minor/cosmetic.
- Juice pass against `UX_UI.md` §6 — every player action produces feedback.
- Balance pass against playtests, tuned via data files only.
- Performance pass: budgets verified on target hardware, plus a documented minimum-spec tier.
- Accessibility pass: full checklist from `UX_UI.md` §7 verified.
- Audio mix pass, normalization, ducking verified.
- Full regression suite green; release-candidate build produced.
- Store assets produced: capsule art, screenshots, trailer (pending **D-18**).

**Exit criteria**
- [ ] Release-candidate build frozen.
- [ ] Regression suite green on the RC build.
- [ ] No known blocker/critical bugs.
- [ ] Owner sign-off.

---

## 7. Milestone 6 — Release

**Goal:** Ship it, support it, and be able to fix it.

**Deliverables**
- Store page live with all required assets, descriptions, and compliance fields.
- Build uploaded and verified from a clean download.
- Day-one patch process rehearsed (hotfix path proven, not hypothetical).
- Release notes and known-issues list published.
- Post-launch triage process defined with owners for each bug class.
- Post-mortem: what the milestone plan got wrong, recorded for the next project.

**Exit criteria**
- [ ] Public build downloaded from the store and played to completion by the owner.
- [ ] Support/response channel live.
- [ ] Owner declares release.

---

## 8. Timeline

> ⏳ OPEN — cannot be estimated until D-01 (concept), D-02 (engine), D-03 (platform), D-08 (art style) and D-09 (scope) are decided. Art style and scope are the two largest drivers of total duration.

**Sizing principle to be applied once known:** estimate Milestone 3's single content unit in hours, multiply by the content count, add ~35% for integration and rework, then add Milestones 5–6 at roughly 30–40% of the total production time. The agent will present this as a range with assumptions stated, not a false-precision number.

---

## 9. Task card index

| Milestone | Task cards | Location |
|---|---|---|
| 1 Foundation | ⏳ none yet — blocked on D-02 | `/ai/tasks/` |
| 2–6 | not written (by design) | — |

---

## 10. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Six-milestone structure, gates and exit criteria established. Timeline blocked on owner decisions. No task cards written yet. | Agent |
