# VEILROT — Project Charter

**Document owner:** Project Coordinator / Game Planner (AI agent)
**Repository:** https://github.com/steveruffin5076/Veilrot
**Working title:** `Veilrot` *(taken from the repository name — no creative meaning has been assigned to it yet)*

**Status legend used across all `/ai` documents:**

| Marker | Meaning |
|---|---|
| ✅ **LOCKED** | Owner-approved. Claude Code may build against this. Do not change without a new decision record. |
| 🔵 **PROPOSAL** | Written by the AI agent, awaiting owner approval. Not buildable yet. |
| ⏳ **OPEN** | Owner decision required. Nothing downstream may be assumed. |
| 🚧 **IN PROGRESS** | Actively being worked. |
| ⚠️ **BLOCKED** | Cannot proceed until something else resolves. |

---

## 0. READ THIS FIRST — How this project runs

This project follows a strict sequential workflow. No step is skipped.

```
PLAN  →  APPROVE  →  DOCUMENT  →  TASKS  →  CLAUDE CODE IMPLEMENTATION
 (AI)     (OWNER)      (AI)        (AI)            (Claude Code)
```

**Roles in this project:**

| Role | Who | Responsibility |
|---|---|---|
| **Owner / Final Authority** | You (steveruffin5076) | Every major creative and commercial decision. See §5 for the full list. |
| **Planner · Designer · UX · Researcher · Docs · Coordinator** | This agent | Turns the owner's idea into a complete, unambiguous, implementable development plan. Maintains all 11 `/ai` documents. Writes Claude Code task cards. Does **not** write production game code. |
| **Implementer** | Claude Code | Writes and tests the actual game code, strictly against approved `/ai` docs and task cards. |
| **Art Producer** | Art AI or a human artist | Produces assets to the 10-point specs in `ASSET_PIPELINE.md`, delivers into `/assets`. |

**Hard rules for the AI agent (self-imposed, per owner instruction):**

1. Never invent game concept, story, characters, mechanics, scope, monetization, platform, visual direction, or release plan. These are ⏳ OPEN until the owner decides.
2. Always label content as **OWNER DECISION** or **AGENT PROPOSAL**. Never blur the two.
3. Never overwrite useful existing information in `/ai`. Supersede it with a decision record instead.
4. Do not write game code unless explicitly asked by the owner.
5. Do not hand a milestone to Claude Code until its task cards have acceptance criteria and tests.

---

## 1. Intake status

> ⚠️ **INTAKE INCOMPLETE — project cannot be specified yet.**

As of the last inspection of `main` / `arena/01a0b39b-veilrot`:

- Repository contents: `README.md` only (a single line: `# Veilrot`).
- `/ai` documentation: **did not exist** — created as scaffolding by this agent.
- `/assets`: **did not exist** — created as empty category folders by this agent.
- Source code: **none**.
- GitHub: no description, no topics, no issues, no pull requests, no other branches.
- **The owner's concept `.md` file was referenced but was not present in the workspace or the repository.** See §2.

**What this means:** the 11 `/ai` documents exist and are structurally complete, but every field that depends on the game concept is marked ⏳ OPEN. Filling them requires the owner's input.

---

## 2. Missing concept document

The owner's instruction referenced an uploaded Markdown file containing the game idea (reference game, genre, mechanics, or rough concept). **That file is not in the repository and was not received.** The only `.md` file anywhere in the workspace is `README.md`.

Until the concept arrives, the only information available about this game is the title **"Veilrot"**, which is a repository name and nothing more.

**Resolution required from the owner:** paste the concept text directly into chat (most reliable), or commit it to `/ai/CONCEPT_INTAKE.md` in the repository.

---

## 3. Concept summary

*Every row here is an OWNER DECISION. No defaults are assumed.*

| Field | Value | Source |
|---|---|---|
| Working title | `Veilrot` | Repository name (not a creative decision) |
| Genre / sub-genre | ⏳ OPEN | — |
| Reference game(s) / "comp" | ⏳ OPEN | — |
| Camera / perspective | ⏳ OPEN | — |
| Distribution (web) | ⏳ OPEN (D-24) | — |
| Core fantasy (what the player *feels*) | ⏳ OPEN | — |
| Target platform(s) | ✅ **Browser-first** — desktop web → mobile web → Android app (**DEC-001**) | OWNER |
| Target player / audience | ⏳ OPEN | — |
| Session length target | ⏳ OPEN | — |
| Core gameplay loop | ⏳ OPEN | — |
| Combat / primary system | ⏳ OPEN | — |
| Progression model | ⏳ OPEN | — |
| World / setting / tone | ⏳ OPEN | — |
| Narrative delivery | ⏳ OPEN | — |
| Visual direction | ⏳ OPEN | — |
| Monetization | ⏳ OPEN | — |
| Release target / date | ⏳ OPEN | — |
| Team size & budget | ⏳ OPEN | — |

---

## 4. Design pillars

> 🔵 **PROPOSAL — placeholder.** Design pillars must be *derived from the owner's concept*, not invented. This section will be drafted immediately after intake and submitted for approval.

Pillars will be written in the form: **"This game is about ___"**, each with (a) what it commits the design to, and (b) what it explicitly forbids. Anything that fails a pillar gets cut.

| # | Pillar | Commits us to | Forbids |
|---|---|---|---|
| 1 | ⏳ pending intake | — | — |
| 2 | ⏳ pending intake | — | — |
| 3 | ⏳ pending intake | — | — |

---

## 5. Owner-only decisions (the authority list)

Per the owner's instruction, the AI agent must never decide these silently. They are tracked individually in `DECISIONS.md` with status ⏳ OPEN until answered.

**Creative:** game concept · gameplay direction · scope · visual direction · story · characters · major mechanics
**Commercial / release:** monetization · platform · release timing & format

Anything in these categories that appears anywhere in `/ai` is a **proposal awaiting approval** and is labelled as such.

---

## 6. Documentation map

| # | File | Owns | Primary reader |
|---|---|---|---|
| 1 | `PROJECT.md` | Vision, pillars, scope guardrails, workflow, roles | Everyone |
| 2 | `PRODUCT_REQUIREMENTS.md` | Numbered requirements (PR-###) + acceptance criteria | Claude Code, QA |
| 3 | `UX_UI.md` | Screens, flows, HUD, input, feedback, accessibility | Claude Code, Art |
| 4 | `ARCHITECTURE.md` | Engine, folder layout, systems, data, placeholders | Claude Code |
| 5 | `FEATURES.md` | Feature register (FEAT-###) with priority + milestone | Coordinator, Claude Code |
| 6 | `MILESTONES.md` | 6-milestone plan, exit criteria, gates | Everyone |
| 7 | `CURRENT_STATE.md` | Live dashboard: what's done, next, blocked | Everyone (read this first daily) |
| 8 | `DECISIONS.md` | Decision log (DEC-###) + pending decision register | Everyone |
| 9 | `CODING_RULES.md` | House rules Claude Code must obey | Claude Code |
| 10 | `QA_TEST_PLAN.md` | Test strategy, cases (TC-###), traceability, release gate | QA, Claude Code |
| 11 | `ASSET_PIPELINE.md` | 10-point asset specs, registry, mock asset protocol | Art AI / artist, Claude Code |
| + | `tasks/` | Atomic Claude Code task cards (one file per task) | Claude Code |

**Single source of truth:** GitHub. If it is not in this repository, it does not exist.

---

## 7. Scope guardrails

> ⏳ **OPEN — cannot be set until the concept is known.**

Guardrails will define, in numbers: MVP feature ceiling, content volume ceiling (levels/hours), art-asset budget, and the explicit "NOT IN MVP" list. The purpose is to protect the release date from ambition creep. Until then, the standing rule is: **no feature enters the register without an owner-approved milestone assignment.**

---

## 8. Open decisions index

See `DECISIONS.md` § *Pending decision register* for the full list of blocking decisions (engine, platform, genre, art style, scope and others) with the reasoning for each.

---

## 9. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Created project charter; repo inspected and found empty; `/ai` scaffolding established; intake blocked pending owner's concept document | Agent |
| 2026-09-18 | **DEC-001 locked: platform is browser-first** (desktop web → mobile web → Android). Updated `ARCHITECTURE.md`, `PRODUCT_REQUIREMENTS.md` and `CURRENT_STATE.md` for web constraints; registered D-23…D-26. | Agent |
