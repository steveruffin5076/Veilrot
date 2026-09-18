# Veilrot

> **Status:** ⚠️ **PRE-PRODUCTION / INTAKE** — no game concept received yet, no source code, no assets.
> See [`ai/CURRENT_STATE.md`](ai/CURRENT_STATE.md) for the live project dashboard.

Veilrot is a game project under development. **All design, planning and production documentation lives in [`/ai`](ai/).**

---

## Where to start

| If you are… | Read this |
|---|---|
| **The project owner**, wanting the current status | [`ai/CURRENT_STATE.md`](ai/CURRENT_STATE.md) |
| **The implementer (Claude Code)** | [`ai/CURRENT_STATE.md`](ai/CURRENT_STATE.md) → the active task card in [`ai/tasks/`](ai/tasks/) → [`ai/CODING_RULES.md`](ai/CODING_RULES.md) |
| **An artist or art AI** | [`ai/ASSET_PIPELINE.md`](ai/ASSET_PIPELINE.md) (all assets are specified there before production) |
| **Trying to understand the game** | [`ai/PROJECT.md`](ai/PROJECT.md) — *see the intake status: the concept is not yet defined* |

---

## Repository structure

```
Veilrot/
├── README.md      ← you are here
├── ai/            ← all design & planning documentation (11 documents + task cards)
├── assets/        ← art, audio, fonts, UI (specs in ai/ASSET_PIPELINE.md)
└── src/           ← game source code (to be created — engine decision pending)
```

---

## Documentation index (`/ai`)

| File | Contents |
|---|---|
| [`PROJECT.md`](ai/PROJECT.md) | Vision, design pillars, scope guardrails, workflow and roles |
| [`PRODUCT_REQUIREMENTS.md`](ai/PRODUCT_REQUIREMENTS.md) | Requirements (PR-###), NFRs, MVP definition, Definition of Done |
| [`UX_UI.md`](ai/UX_UI.md) | Screens, flows, HUD, input, feedback conventions, accessibility |
| [`ARCHITECTURE.md`](ai/ARCHITECTURE.md) | Engine options, repo layout, systems, data & save conventions, placeholder protocol |
| [`FEATURES.md`](ai/FEATURES.md) | Feature register (FEAT-###) with priority, milestone, lifecycle gates |
| [`MILESTONES.md`](ai/MILESTONES.md) | Six milestones with deliverables and measurable exit criteria |
| [`CURRENT_STATE.md`](ai/CURRENT_STATE.md) | **Live dashboard** — what is done, in progress, blocked, and next |
| [`DECISIONS.md`](ai/DECISIONS.md) | Locked decisions (DEC-###) and the pending decision register |
| [`CODING_RULES.md`](ai/CODING_RULES.md) | House rules the implementer must follow |
| [`QA_TEST_PLAN.md`](ai/QA_TEST_PLAN.md) | Test strategy, case format, severity model, playtest protocol, release gate |
| [`ASSET_PIPELINE.md`](ai/ASSET_PIPELINE.md) | 10-point asset specs, registry, mock-asset protocol, approval workflow |
| [`tasks/`](ai/tasks/) | Atomic Claude Code task cards |

---

## Workflow

```
PLAN  →  APPROVE  →  DOCUMENT  →  TASKS  →  CLAUDE CODE IMPLEMENTATION
 (AI)     (OWNER)      (AI)        (AI)            (Claude Code)
```

- **The owner is the final authority** on concept, gameplay direction, scope, visual direction, story, characters, major mechanics, monetization, platform and release.
- **The coordinator (AI)** turns ideas into specified, testable, implementable documentation and writes task cards. It does not write production game code and does not make major creative decisions.
- **Claude Code** implements against approved documentation only.
- **GitHub is the single source of truth.** If it is not in this repository, it does not exist.

---

## Blocker right now

The owner's game concept document has not been received (the referenced upload did not arrive). Until it does, all creative fields are marked ⏳ OPEN and no code can be written. Details and the fastest path forward are in [`ai/CURRENT_STATE.md`](ai/CURRENT_STATE.md) §7.
