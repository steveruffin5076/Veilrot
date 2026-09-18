# VEILROT — Autonomous Game Development Project

> **Unified AI development workflow for Claude Cowork / Arena.ai, Cursor AI / Claude Code, ART AI, and GitHub.**

---

## ⛔ CURRENT STATUS — READ FIRST

| Field | Value |
|---|---|
| **Phase** | INTAKE / PRE-PRODUCTION |
| **Active milestone** | `Milestone 1: Technical Foundation & Scaffolding` — **BLOCKED** |
| **Blocker 1** | **D-01a — the game concept is NOT confirmed.** The `/ai` design content was recovered from a *worked example inside a starter template*, not from an approved concept. It is labelled **Candidate Concept A** and every value in it is 🔵 PROPOSAL. |
| **Blocker 2** | **D-02 — no engine chosen.** |
| **Source code** | None. No implementation may begin until both are resolved. |

👉 **Next action for the owner:** read `ai/CURRENT_STATE.md` §8 and answer **D-01a**, **D-02**, and **D-09** in `ai/DECISIONS.md` §3.

---

## Overview

This repository is a production-ready structure for **autonomous, AI-driven game development**. It establishes an ironclad division of labour between **Thinking & Planning**, **Asset Creation**, **Implementation & Coding**, and **Playtesting**, using **GitHub** as the single source of truth.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           GITHUB REPOSITORY                             │
│                     (Single Source of Truth)                            │
│  ├── /ai/ (11 Core Markdown Docs + task cards)                          │
│  ├── /assets/ (approved · mock · raw media)                             │
│  ├── /src/ (game source code — not yet created)                         │
│  └── .cursorrules / CLAUDE.md (AI agent configuration)                  │
└────────────┬────────────────────┬────────────────────┬──────────────────┘
             │                    │                    │
             ▼                    ▼                    ▼
     ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
     │ CLAUDE COWORK │    │ ART/ASSET AI  │    │   CURSOR AI   │
     │  (or Arena)   │    │  (or Artist)  │    │(or Claude Code)│
     │  THINK & PLAN │    │  CREATE ART   │    │  CODE & BUILD │
     └───────────────┘    └───────────────┘    └───────────────┘
```

---

## Role Separation Matrix

| Role | Entity | Primary responsibilities | Output artifacts |
|---|---|---|---|
| **Game Planner & Designer** | **Claude Cowork** (or Arena.ai) | System design, combat maths, UX/UI flows, asset specs, milestones, task breakdown. *(DOES NOT CODE)* | `/ai/*.md` documentation, task cards |
| **Asset & Visual Artist** | **ART/ASSET AI** (or human) | Sprites, models, textures, portraits, UI elements, audio, VFX — per spec. | Media in `/assets/approved/` |
| **Implementation Engineer** | **Cursor AI** (or Claude Code) | Reads `/ai` docs, writes clean game code, implements features atomically, runs tests and builds. | Source code in `/src/`, tests |
| **Creative Director & QA** | **You** | Decides concept, approves proposals, evaluates art, playtests builds, authorises milestone completion. | Final decisions, playtest feedback |
| **Source of Truth** | **GitHub** | Central version control for all documentation, approved assets and builds. | Commits, PRs, tags |

---

## Quick Start Guide

### Step 1 — Initialize the repository ✅ *done*
The `/ai`, `/assets` and `/src` structures exist, plus `CLAUDE.md` and `.cursorrules`.

### Step 2 — Planning in Claude Cowork / Arena.ai 🚧 *in progress, blocked*
1. The **Master Game Planning Prompt** (below) is already in effect.
2. Send the game idea — e.g. *"a tactical RPG inspired by Final Fantasy Tactics with job classes and height advantage"*.
3. Review and approve the structured proposals, keeping **My Decisions** separate from **AI Proposals**.
4. The planner populates all 11 `/ai/*.md` files and generates Milestone 1 task cards in `ai/CURRENT_STATE.md`.

> ⚠️ **Where we are now:** a starter template was uploaded that contains a worked example (an isometric tactical RPG). The planner has structured that example into `/ai` as **Candidate Concept A**, clearly marked as unapproved, and is waiting for you to confirm it — or to send the real concept.

### Step 3 — Media & asset generation *(optional / parallel)*
1. The planner outputs 10-point specifications in `ai/ASSET_PIPELINE.md`.
2. Generate assets via external AI generators or human artists.
3. Place approved assets in `assets/approved/`.
4. **Rule:** if art is pending, development **never halts** — the implementer uses procedural placeholders (DEC-002).

### Step 4 — Coding with Cursor AI / Claude Code ⛔ *blocked*
1. Open the repository in Cursor AI, or launch the `claude` CLI.
2. Paste the **Implementation Master Prompt** below.
3. The engineer reads `ai/CURRENT_STATE.md` and `ai/CODING_RULES.md`, implements the active task cards atomically, runs tests and updates `ai/CURRENT_STATE.md`.

> **Do not start this step yet.** `CLAUDE.md` and `.cursorrules` both carry a stop condition: no code while D-01a or D-02 is open.

### Step 5 — Playtest & iterate
1. Playtest the build.
2. Paste observations, bug reports and balance notes back into Claude Cowork.
3. The planner updates `ai/DECISIONS.md`, `ai/QA_TEST_PLAN.md`, and writes the next milestone's task cards.

---

## Repository Directory Layout

```
/
├── .cursorrules                # Automated rules for Cursor AI
├── CLAUDE.md                   # Instructions for Claude Code CLI
├── README.md                   # This document
├── .gitignore
├── ai/                         # The 11 core documentation files (+ task cards & intake)
│   ├── PROJECT.md              # Vision, core fantasy, platform, engine, governance
│   ├── PRODUCT_REQUIREMENTS.md # Functional requirements, core loop, MVP scope
│   ├── UX_UI.md                # Screen flows, HUD layout, design tokens, controls
│   ├── ARCHITECTURE.md         # Engine architecture, systems, save/load, web requirements
│   ├── FEATURES.md             # Stats, job classes, combat maths, AI behaviour
│   ├── MILESTONES.md           # 6-stage roadmap (M1→M6)
│   ├── CURRENT_STATE.md        # Live tracker: blockers, active tasks, next steps
│   ├── DECISIONS.md            # Decision log: owner decisions vs AI proposals
│   ├── CODING_RULES.md         # Mandatory standards for the implementer
│   ├── QA_TEST_PLAN.md         # Test specs, playtest matrix, bug triage, release gate
│   ├── ASSET_PIPELINE.md       # 10-point asset specs & approval status
│   ├── CONCEPT_INTAKE.md       # Template for submitting the game idea
│   └── tasks/                  # Atomic task cards (per-milestone)
├── assets/
│   ├── approved/               # Final approved assets, ready for integration
│   │   ├── characters/  environments/  ui/  audio/  vfx/
│   ├── mock/                   # Procedural & placeholder graphics
│   └── raw/                    # Unprocessed source art (never shipped)
└── src/                        # Game source code — created when D-02 is answered
```

---

## Master Prompts Quick Reference

### 1. Claude Cowork Master Game Planning Prompt
*(Paste into Claude Cowork / Arena.ai before submitting your game idea)*

```markdown
MASTER PROMPT — GAME PLANNING & DESIGN

I want you to act as my Game Planner, Game Designer, UX/UI Designer, Researcher,
Documentation Manager and Project Coordinator.

You are NOT the main programmer.
The actual coding/implementation will be done later by Cursor AI (or Claude Code).
GitHub will be the single source of truth for the project.

YOUR JOB:
I will give you a game idea, reference game, genre, mechanics or rough concept.
Your job is to turn my idea into a complete, practical game development plan and
maintain the project's Markdown documentation inside /ai.

Before making major decisions, understand that I AM THE FINAL AUTHORITY for:
- game concept, gameplay direction, scope, visual direction, story, characters,
  major mechanics, monetization, platform, and release direction.

Do not silently make major creative decisions. When something is unclear, identify
it as a decision I need to make. Clearly distinguish: MY DECISIONS from YOUR PROPOSALS.

STEP 1 — INSPECT THE PROJECT: Inspect existing code, /ai documentation, /assets, and
previous decisions. Do not overwrite useful existing info.
STEP 2 — UNDERSTAND MY GAME IDEA: Convert the idea into structured design: genre,
platform, target player, core fantasy, gameplay loop, mechanics, combat, progression,
world, narrative, UX/UI, visuals, audio, MVP scope.
STEP 3 — MAINTAIN DOCUMENTATION: Maintain all 11 Markdown files inside /ai.
STEP 4 — GAME DESIGN: Detail systems so an AI coding assistant can implement them
without ambiguity.
STEP 5 — 10-POINT ASSET PIPELINE: Define asset specs (Name, Purpose, Style,
Dimensions, Format, Path, Animation, Acceptance Criteria, Approval Status) in
/ai/ASSET_PIPELINE.md.
STEP 6 — MISSING ART TOOLS PROTOCOL: If an environment has no art tool, DO NOT treat
development as blocked. Continue all logic and code using placeholder geometry.
STEP 7 — DEVELOPMENT MILESTONES: Break the project into 6 milestones
(1. Foundation -> 2. Core Playable Loop -> 3. Vertical Slice -> 4. Content Expansion
-> 5. Polish/QA -> 6. Release).
STEP 8 — CREATE TASKS: Convert the active milestone into atomic task cards with files,
behaviors, dependencies, acceptance criteria, and tests.
STEP 9 — MAINTAIN CURRENT_STATE.MD: Always keep ai/CURRENT_STATE.md synchronized.
STEP 10 — DO NOT CODE UNLESS ASKED: Work sequentially:
PLAN -> APPROVE -> DOCUMENT -> TASKS -> CODE.
Propose high-level design first, wait for my approval, then detail it.
```

---

### 2. Cursor AI / Claude Code Master Implementation Prompt
*(Paste into Cursor Composer `Cmd+I` or the Claude Code CLI)*

```markdown
MASTER PROMPT — IMPLEMENTATION ENGINEER

You are the Lead Game Programmer implementing this project using Cursor AI / Claude Code.
GitHub is our single source of truth.

YOUR STARTUP SEQUENCE:
1. Read /ai/PROJECT.md, /ai/ARCHITECTURE.md, /ai/CODING_RULES.md, and /ai/CURRENT_STATE.md.
2. STOP if /ai/DECISIONS.md shows D-01a (concept) or D-02 (engine) as OPEN — report and wait.
3. Identify the active milestone and the next uncompleted task card in /ai/CURRENT_STATE.md.
4. Check /ai/ASSET_PIPELINE.md for approved assets in /assets/approved/.
   If an asset is missing or pending, use mock procedural placeholders — do NOT halt coding.

IMPLEMENTATION RULES:
• Obey all coding conventions, architecture patterns, and rules in /ai/CODING_RULES.md.
• Implement ONE task card at a time. Keep code modular, clean, typed, and well-commented.
• Platform is browser-first (DEC-004): audio unlock gate, evictable save storage with
  export/import, delta-time clamping on tab return, DPR cap, touch parity, payload budget,
  version string in the debug overlay.
• Run local build checks and unit tests after implementing each task card.
• Update /ai/CURRENT_STATE.md upon completion to check off tasks and update next steps.
• Create clean Git commits with clear semantic messages (e.g. feat:, fix:, refactor:).

BEGIN EXECUTION:
Read /ai/CURRENT_STATE.md now. If blockers are open, stop and report them.
Otherwise output your execution plan for the active task, and build.
```
