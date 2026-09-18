# DEVELOPMENT MILESTONES & ROADMAP

> **Status:** `DRAFT` — adapted from the template's roadmap (Candidate Concept A)
> **Last Updated:** 2026-09-18
> **Maintained By:** Claude Cowork / Arena.ai
> **Target Consumer:** Owner & Implementation Engineers

---

## 1. Rules of the milestone system

1. **One milestone active at a time.** The active one is recorded in `CURRENT_STATE.md`.
2. **No milestone begins before the previous one is signed off by the owner.** Sign-off is recorded in `DECISIONS.md`.
3. **Every milestone ends with a demonstrable build.** If it cannot be run and seen, it is not done.
4. **Task cards are written only for the current milestone** — never batch-write future milestones.
5. **Cutting scope is fine; extending a milestone is fine; carrying unverified work forward is not.**

## 2. Milestone Overview

```
[M1: Foundation] ──> [M2: Core Playable Loop] ──> [M3: Vertical Slice]
                                                          │
[M6: Release] <──── [M5: Polish & QA] <───── [M4: Content Expansion]
```

---

## 3. Milestone 1: Technical Foundation & Scaffolding

**Objective** — Establish project architecture, scene manager, grid representation, unit rendering, and input handling.

> ⚠️ **Blocked by D-02 (engine).** No task cards may be issued until the engine is chosen.

**Key features**
- Game bootstrap + 60 FPS loop + scene manager (`TitleScene`, `BattleScene`).
- Isometric grid data structure with tile rendering and elevation tiers.
- Basic unit rendering with placeholder colour blocks.
- Input controller: camera pan, tile selection, hover cursor.
- ✅ **Added by the web target (DEC-004):** static web build deployable over HTTPS from one command; **audio unlock gate**; resize/DPR/safe-area handling; debug overlay with fps, frame time and build version.

**Completion criteria**
- [ ] Window launches, displays a 10×10 grid, cursor moves across tiles, and a test unit can be selected.
- [ ] Fresh clone → one command → playable in a browser tab.
- [ ] Runs on a **real mobile phone browser** (whatever its quality at this stage).
- [ ] Zero errors, zero warnings; CI green; owner sign-off recorded.

**Not included:** any real gameplay, real art, or audio content.

---

## 4. Milestone 2: Core Playable Combat Loop

**Objective** — Implement full turn-based combat resolution between player and mock enemies. Ugly is fine; **fun is mandatory**.

**Key features**
- A\* pathfinding and movement range calculation.
- Charge Time (CT) speed-based turn queue + visible turn timeline.
- Basic physical attack, damage formula, HP bars, hit/crit rolls (seeded RNG).
- **Damage/hit/crit preview before committing an attack** (REQ-CBT-04).
- Enemy AI turn execution (approach and attack; heal/retreat behaviours).
- Win/loss condition evaluation.
- All tunables in `data/`; unit tests for combat maths, CT accumulation and pathfinding.

**Completion criteria**
- [ ] Player can defeat an enemy unit, or suffer defeat; the combat log correctly reflects the damage maths.
- [ ] The loop can be played for 10 minutes without a crash or soft-lock.
- [ ] Playable by **touch alone** on a phone (REQ-IN-04).
- [ ] **Owner answers the question "is this core loop worth building a game around?" in writing.** This is the project's biggest risk and it is retired here, cheaply.

**Not included:** progression, real content volume, final art, narrative, polish.

---

## 5. Milestone 3: Vertical Slice (The Playable Stage)

**Objective** — Deliver one fully polished tactical battle stage with complete UI, audio, approved artwork and a cutscene intro. **This is the quality bar and the scope yardstick for everything after.**

**Key features**
- Complete battle HUD (action menu, turn timeline, unit detail card, tile/target info).
- Integration of approved sprites, animations and sound effects.
- Pre-battle dialogue cutscene and victory rewards modal.
- Title screen and pause menu — every screen with a desktop **and** touch layout.
- Settings: audio buses, control remap, accessibility basics.
- Asset pipeline proven end-to-end: a real asset lands in `/assets/approved/` and appears in game **with no code change**.
- PWA manifest + service worker.

**Completion criteria**
- [ ] A polished 5-minute playable demo that looks and feels like a commercial game.
- [ ] Zero placeholder assets inside the slice.
- [ ] Measured cost per content unit is known — **this number sizes Milestone 4**.
- [ ] External playtest by at least one person who is not the owner; feedback logged in `QA_TEST_PLAN.md`.

---

## 6. Milestone 4: Content & System Expansion

**Objective** — Scale mechanics, jobs, equipment and the campaign. **Multiply content at the quality and cost established in M3.**

> ⚠️ **Content count is blocked by D-09** — the template conflicts (4 job classes / 5 stages vs 8 classes / 15 stages).

**Key features**
- Job classes (count per D-09) + skill tree unlocking and the JP economy.
- Campaign stages with varied terrain, height tiers and enemy compositions (count per D-09).
- Save/load serialisation + export/import + version migration.
- Difficulty/accessibility options.
- Full playthrough completable start-to-finish by a first-time player.

**Completion criteria**
- [ ] Player can progress through the full stage list, customise squad jobs, and save/load progress.
- [ ] Complete playthrough, start to end, no blockers, by an external person.
- [ ] Content count matches the approved scope, or the difference is an owner decision.
- [ ] **Android: register the Play Console app and start the closed test here** — Google Play requires 12 testers for 14 continuous days before production access for new personal accounts (`DECISIONS.md` D-23). This is calendar time and cannot be compressed.

---

## 7. Milestone 5: Polish, Balance & QA Hardening

**Objective** — Eliminate bugs, optimise, and fine-tune balance. No new features except where a feature *is* the fix.

**Key features**
- Audio mastering (BGM volume, SFX balance, ducking).
- Accessibility settings complete (colour-blind options, key remapping, text scale) and verified.
- Edge-case testing: simultaneous CT ticks, boundary jumps, impassable-terrain traps, unit-killed-during-its-own-turn.
- Performance profiling: zero frame drops during heavy combat particles, on a **real mid-range phone**.
- Balance pass driven by playtest data, tuned through data files only.
- Regression suite green; release-candidate build frozen.

**Completion criteria**
- [ ] Zero critical bugs in `QA_TEST_PLAN.md`; every other bug has an explicit disposition.
- [ ] Rock-solid 60 FPS on target hardware, including mobile.
- [ ] Web test obligations W-01…W-11 pass on real devices.
- [ ] Release-candidate build frozen; owner sign-off.

---

## 8. Milestone 6: Release & Distribution

**Objective** — Final packaging, distribution and store assets.

**Key features**
- Production web build deployed to its public URL (pending **D-24**: itch.io / own domain / portals).
- Android build published or scheduled (pending **D-23**).
- Store/portal graphics and release documentation.
- Crash reporting / analytics only if the owner allows it (**D-19** — includes a privacy stance).
- Day-one patch process rehearsed; rollback path proven for a bad web deploy.

**Completion criteria**
- [ ] Public build loaded from its URL on a **fresh device (no cache)** and played to completion by the owner.
- [ ] Play Console closed-testing requirement satisfied **before** this point, not started at it.
- [ ] Owner declares release.

---

## 9. Timeline

> ⏳ OPEN — cannot be estimated until **D-02** (engine), **D-08** (art style) and **D-09** (scope) are decided. Art style and content count are the two largest drivers of total duration.
>
> **Sizing principle, applied once known:** estimate the M3 content unit in hours, multiply by the content count, add ~35% for integration and rework, then add M5–M6 at 30–40% of total production time. Presented as a range with assumptions stated — never false precision.
>
> **One calendar constraint exists independently of work:** the Android closed-testing window (D-23). It must overlap content production, not follow it.

---

## 10. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Six-milestone structure authored | Agent |
| 2026-09-18 | **Merged with the template's roadmap.** Adopted: milestone names, objectives, key-feature lists and completion criteria. Added: the milestone gate rules, the web-target deliverables in M1 (deployable HTTPS build, audio gate, real-phone test), M2's "is the loop fun?" owner sign-off, M3's cost-per-unit measurement, M4's Play Console timing, M5's web test obligations and device-real performance testing, and M6's fresh-device release validation. Flagged the M4 content-scope conflict. | Agent |
