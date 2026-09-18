# /ai/tasks/ — Claude Code Task Cards

**Purpose:** Atomic, unambiguous work orders for the implementer. The coordinator writes them; Claude Code executes them; the coordinator verifies and updates `CURRENT_STATE.md`.

**Rule:** task cards are written **only for the milestone that is currently active**, never in batches for future milestones.

---

## Task card template (mandatory format)

```markdown
# <TASK-ID> — <Task title>

- **Milestone:** 1 Foundation
- **Feature:** FEAT-### (link into FEATURES.md)
- **Requirements:** PR-### / NFR-## (links into PRODUCT_REQUIREMENTS.md)
- **Priority:** MUST | SHOULD | COULD
- **Estimate:** S (<2h) | M (2–6h) | L (1–2 days)  — estimate, not a deadline
- **Depends on:** <other task IDs that must be complete first>
- **Blocks:** <tasks that wait on this>

## What to build
<One paragraph, in plain language. The outcome, not the technique.>

## Why it is needed
<What breaks or is impossible without it. Links to the design intent.>

## Files & locations
- Create: `src/…`
- Modify: `src/…`
- Read first: `ai/…`
- Assets: `AST-###` (state clearly which are real and which are placeholders)

## Expected behaviour
<Numbered, observable behaviours. Precise numbers, not adjectives.>

## Out of scope
<Explicitly what NOT to build. Prevents scope creep and reinterpretation.>

## Constraints
<Performance budget, platform, conventions from CODING_RULES.md that especially apply.>

## Acceptance criteria
- [ ] <Binary, verifiable statement>
- [ ] <Binary, verifiable statement>
- [ ] Compiles with zero errors and zero warnings
- [ ] No hard-coded player-facing strings
- [ ] No inline tunables that belong in data

## Tests to write
- **Unit:** <specific cases>
- **Integration:** <if applicable>
- **Manual:** <what to click and what to expect>

## Evidence required in the PR
<screenshot / clip / test output / log line>

## Notes for the implementer
<Gotchas, prior art in the repo, related decisions.>

## Coordinator verification
- [ ] Acceptance criteria checked against the built game
- [ ] Tests run on this branch
- [ ] CURRENT_STATE.md updated
```

---

## Task ID convention

`<MILESTONE>-<NNN>-<slug>` — e.g. `M1-004-asset-service`. IDs are never reused.

---

## Index

| ID | Title | Milestone | Status |
|---|---|---|---|
| — | *No task cards yet.* Milestone 1 is blocked on **D-02 (engine choice)** — see `DECISIONS.md` §3 and `CURRENT_STATE.md` §3. | 1 | ⏳ BLOCKED |

---

## Status vocabulary

`DRAFT` → `READY` → `IN DEV` → `IN REVIEW` → `VERIFIED` · or `BLOCKED` · or `CUT`

A card may only move to `READY` when its dependencies are complete and its asset dependencies are identified (real or placeholder).
