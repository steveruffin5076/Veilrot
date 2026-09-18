# Autonomous Game Development Starter Template

> **Unified AI Development Template for Claude Cowork, Cursor AI, Claude Code, and GitHub.**

---

## Overview

This repository is a production-ready template designed for **autonomous, AI-driven game development**. It establishes an ironclad division of labor between **Thinking & Planning**, **Asset Creation**, **Implementation & Coding**, and **Playtesting**, using **GitHub** as the single source of truth.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           GITHUB REPOSITORY                             │
│                     (Single Source of Truth)                            │
│  ├── /ai/ (11 Core Markdown Docs)                                       │
│  ├── /assets/ (Approved, Raw & Mock Media)                              │
│  ├── /src/ (Game Source Code)                                           │
│  └── .cursorrules / CLAUDE.md (AI Agent Configuration)                  │
└────────────┬────────────────────┬────────────────────┬──────────────────┘
             │                    │                    │
             ▼                    ▼                    ▼
     ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
     │ CLAUDE COWORK │    │ ART/ASSET AI  │    │   CURSOR AI   │
     │  (or Arena)   │    │  (or Artist)  │    │(or ClaudeCode)│
     │  THINK & PLAN │    │  CREATE ART   │    │  CODE & BUILD │
     └───────────────┘    └───────────────┘    └───────────────┘
```

---

## Role Separation Matrix

| Role | Entity | Primary Responsibilities | Output Artifacts |
| :--- | :--- | :--- | :--- |
| **Game Planner & Designer** | **Claude Cowork** (or Arena.ai) | System design, combat math, UX/UI flows, asset specs, milestones, Cursor task breakdown. *(DOES NOT CODE)* | `/ai/*.md` documentation, task cards |
| **Asset & Visual Artist** | **ART/ASSET AI** (or Human) | Generates sprites, 3D models, textures, portraits, UI elements, audio, and VFX per spec. | Media in `/assets/approved/` |
| **Implementation Engineer** | **Cursor AI** (or Claude Code) | Reads `/ai` docs, writes clean game code, implements features atomically, runs tests & builds. | Source code in `/src/`, tests |
| **Creative Director & QA** | **You** | Decides concept, approves proposals, evaluates art, playtests builds, authorizes milestone completion. | Final decisions, playtest feedback |
| **Source of Truth** | **GitHub** | Central version control storing all documentation, approved assets, and working game builds. | Git commits, PRs, tags |

---

## Quick Start Guide

### Step 1: Initialize Your Repository
1. Clone or copy this template repository into your new game repo on GitHub.
2. Ensure the `/ai`, `/assets`, and `/src` directory structures exist.

### Step 2: Start Planning in Claude Cowork
1. Open **Claude Cowork** (or Arena.ai).
2. Paste the **Master Game Planning Prompt** (found in `ai/PROJECT.md` or Section below).
3. Send your game idea (e.g., *"I want to create a tactical RPG inspired by Final Fantasy Tactics with job classes and height advantage"*).
4. Review and approve Claude Cowork's structured proposals (distinguishing **My Decisions** vs **AI Proposals**).
5. Claude Cowork will populate all 11 `/ai/*.md` files and generate **Milestone 1 Task Cards** in `ai/CURRENT_STATE.md`.

### Step 3: Media & Asset Generation (Optional/Parallel)
1. If media is required, Claude Cowork outputs 10-point specifications in `ai/ASSET_PIPELINE.md`.
2. Generate assets via external AI generators (Midjourney, DALL-E, etc.) or human artists.
3. Place approved assets into `assets/approved/`.
4. *Rule:* If art is pending, development **never halts**—Cursor will use procedural placeholder shapes.

### Step 4: Coding with Cursor AI (or Claude Code)
1. Open the repository in **Cursor AI** (or launch `claude` CLI).
2. Paste the **Cursor Master Implementation Prompt** into Cursor Composer (`Cmd+I` / `Ctrl+I`) or Agent mode.
3. Cursor reads `ai/CURRENT_STATE.md` and `ai/CODING_RULES.md`, implements the active tasks atomically, executes tests, and updates `ai/CURRENT_STATE.md`.

### Step 5: Playtest & Iterate
1. Playtest the game build.
2. Paste your observations, bug reports, and balance adjustments back into **Claude Cowork**.
3. Claude Cowork updates `ai/DECISIONS.md`, `ai/QA_TEST_PLAN.md`, and creates Milestone 2 task cards.

---

## Repository Directory Layout

```
/
├── .cursorrules               # Automated rules for Cursor AI Composer & Agent
├── CLAUDE.md                  # Project instructions for Claude Code CLI
├── README.md                  # Project overview and workflow manual
├── .gitignore                 # Standard game engine & OS ignore rules
├── ai/                        # The 11 Core Documentation Files
│   ├── PROJECT.md             # High-level vision, core fantasy, platform, engine
│   ├── PRODUCT_REQUIREMENTS.md# Functional requirements, core loop, MVP scope
│   ├── UX_UI.md               # Screen flows, HUD layout, wireframes, controls
│   ├── ARCHITECTURE.md        # Engine architecture, state machines, ECS, save/load
│   ├── FEATURES.md            # Deep combat math, job classes, AI behavior, stats
│   ├── MILESTONES.md          # 6-stage development roadmap (M1 to M6)
│   ├── CURRENT_STATE.md       # Live execution tracker, active tasks, blockers
│   ├── DECISIONS.md           # Decision log (User decisions vs AI proposals)
│   ├── CODING_RULES.md        # Language style guides, architecture constraints
│   ├── QA_TEST_PLAN.md        # Playtest checklists, test specs, bug triage
│   └── ASSET_PIPELINE.md      # 10-point asset specifications & approval status
├── assets/                    # Project Media Storage
│   ├── approved/              # Final approved assets ready for engine integration
│   │   ├── characters/
│   │   ├── environments/
│   │   ├── ui/
│   │   ├── audio/
│   │   └── vfx/
│   ├── mock/                  # Procedural & placeholder graphics
│   └── raw/                   # Unprocessed source art & project files
└── src/                       # Game Engine Source Code
```

---

## Master Prompts Quick Reference

### 1. Claude Cowork Master Game Planning Prompt
*(Paste this into Claude Cowork before submitting your game idea)*

```markdown
MASTER PROMPT — GAME PLANNING & DESIGN

I want you to act as my Game Planner, Game Designer, UX/UI Designer, Researcher, Documentation Manager and Project Coordinator.

You are NOT the main programmer.
The actual coding/implementation will be done later by Cursor AI (or Claude Code).
GitHub will be the single source of truth for the project.

YOUR JOB:
I will give you a game idea, reference game, genre, mechanics or rough concept.
Your job is to turn my idea into a complete, practical game development plan and maintain the project's Markdown documentation inside /ai.

Before making major decisions, understand that I AM THE FINAL AUTHORITY for:
- game concept, gameplay direction, scope, visual direction, story, characters, major mechanics, monetization, platform, and release direction.

Do not silently make major creative decisions. When something is unclear, identify it as a decision I need to make. Clearly distinguish: MY DECISIONS from YOUR PROPOSALS.

STEP 1 — INSPECT THE PROJECT: Inspect existing code, /ai documentation, /assets, and previous decisions. Do not overwrite useful existing info.
STEP 2 — UNDERSTAND MY GAME IDEA: Convert the idea into structured design: genre, platform, target player, core fantasy, gameplay loop, mechanics, combat, progression, world, narrative, UX/UI, visuals, audio, MVP scope.
STEP 3 — MAINTAIN DOCUMENTATION: Maintain all 11 Markdown files inside /ai.
STEP 4 — GAME DESIGN: Detail systems so an AI coding assistant can implement them without ambiguity.
STEP 5 — 10-POINT ASSET PIPELINE: Define asset specs (Name, Purpose, Style, Dimensions, Format, Path, Animation, Acceptance Criteria, Approval Status) in /ai/ASSET_PIPELINE.md.
STEP 6 — MISSING ART TOOLS PROTOCOL: If an environment has no art tool, DO NOT treat development as blocked. Continue all logic and code using placeholder geometry.
STEP 7 — DEVELOPMENT MILESTONES: Break project into 6 milestones (1. Foundation -> 2. Core Playable Loop -> 3. Vertical Slice -> 4. Content Expansion -> 5. Polish/QA -> 6. Release).
STEP 8 — CREATE CURSOR TASKS: Convert active milestone into atomic task cards with files, behaviors, dependencies, acceptance criteria, and tests.
STEP 9 — MAINTAIN CURRENT_STATE.MD: Always keep ai/CURRENT_STATE.md synchronized.
STEP 10 — DO NOT CODE UNLESS ASKED: Work sequentially: PLAN -> APPROVE -> DOCUMENT -> TASKS -> CODE. Propose high-level design first, wait for my approval, then detail it.
```

---

### 2. Cursor AI / Claude Code Master Implementation Prompt
*(Paste into Cursor Composer `Cmd+I` or Claude Code CLI)*

```markdown
MASTER PROMPT — IMPLEMENTATION ENGINEER

You are the Lead Game Programmer implementing this project using Cursor AI / Claude Code.
GitHub is our single source of truth.

YOUR STARTUP SEQUENCE:
1. Read /ai/PROJECT.md, /ai/ARCHITECTURE.md, /ai/CODING_RULES.md, and /ai/CURRENT_STATE.md.
2. Identify the active milestone and the next uncompleted task card in /ai/CURRENT_STATE.md.
3. Check /ai/ASSET_PIPELINE.md for approved assets in /assets/approved.
   If an asset is missing or pending, use mock procedural placeholders—do NOT halt coding.

IMPLEMENTATION RULES:
• Obey all coding conventions, architecture patterns, and rules in /ai/CODING_RULES.md.
• Implement ONE task card at a time. Keep code modular, clean, typed, and well-commented.
• Run local build checks and unit tests after implementing each task card.
• Update /ai/CURRENT_STATE.md upon completion to check off tasks and update next steps.
• Create clean Git commits with clear semantic messages (e.g. feat:, fix:, refactor:).

BEGIN EXECUTION:
Read /ai/CURRENT_STATE.md now, output your execution plan for the active task, and build.
```
