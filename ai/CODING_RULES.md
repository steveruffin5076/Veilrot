# CODING RULES & ARCHITECTURE STANDARDS

> **Target Audience:** Cursor AI / Claude Code Implementation Engineers
> **Status:** `MANDATORY`
> **Last Updated:** 2026-09-18

**Precedence:** approved design docs in `/ai` > these rules > personal preference. If a rule conflicts with an approved design doc, the design doc wins and the conflict is raised with the coordinator.

---

## 0. The ten laws

1. **Read `/ai` before writing code.** Start with `CURRENT_STATE.md`, then the task card, then the docs it references. Never work from memory of an earlier session.
2. **Never change design intent in code.** If the docs are ambiguous or wrong, **stop and raise it** — do not pick an interpretation and proceed.
3. **Do not edit design documents in `/ai` to justify code.** Only the coordinator maintains design intent. (The implementer *does* update `CURRENT_STATE.md` checkboxes, per the template's workflow.)
4. **One task card at a time**, one purpose per change, reviewable in isolation.
5. **Tunables live in `data/`, never inline.** If a designer would want to change it, it is data.
6. **Every task card's acceptance criteria must be demonstrably met** before the card is closed.
7. **Missing art never blocks code.** Load by asset ID; fall back to an obvious placeholder. (DEC-002)
8. **Leave no rubble.** No commented-out blocks, no orphan files, no TODO without a task-card reference, no debug prints in shipped paths.
9. **Performance is a feature.** Check the debug frame-time overlay after anything touching per-frame work.
10. **When in doubt, ask the coordinator — do not guess.**

---

## 1. General Principles

- **KISS:** prefer simple, readable implementations over clever abstractions.
- **Single responsibility:** each class/module does exactly one thing well.
- **Immutability:** treat game config data as immutable data structures.
- **Type safety:** strict typing everywhere (TypeScript strict mode / GDScript static typing / C# nullables).
- **Explicit over implicit:** this codebase will be read far more than it is written.
- **Fail loudly in development, gracefully in release.** Never swallow an error silently.
- **Determinism:** all randomness goes through the single **seeded RNG service**. Never call the platform RNG directly — reproducible tests and reproducible bug reports depend on it.

---

## 2. File Organisation & Structure

- All source files live in `/src/` using the layout in `ARCHITECTURE.md` §4.
- **Naming:** `PascalCase` for classes/scenes (`BattleController.ts`); `camelCase` for functions and variables (`calculateDamage`); `SCREAMING_SNAKE_CASE` for constants; `snake_case` for data-file keys and asset IDs.
- **Maximum file length: 300 lines.** Beyond that, extract helper components or sub-controllers.
- One responsibility per file. A file described with "and" should be split.
- Functions: one job, early returns over deep nesting, ~50 lines maximum without justification.

---

## 3. Game State & Component Architecture

- **State separation.** Never mix rendering with game maths or state.
  - ✅ Good: `CombatResolver.calculateDamage(attackerStats, targetStats)` returns a pure `DamageResult`.
  - ❌ Bad: combat maths directly tints a sprite and plays a sound inside the maths loop.
- **Event-driven.** Emit state changes on the global `EventBus` (`EventBus.emit("unitDied", unit)`). UI subscribes to events; **UI never reads gameplay state directly.**
- **Pure combat core.** Damage, hit chance, CT accumulation and pathfinding must be pure functions, callable headlessly with no rendering, and unit-testable in isolation.
- **Platform isolation (DEC-004).** Browser-specific behaviour — storage, audio unlock, visibility, resize/DPR/safe-area — lives only in `src/platform/`. Gameplay code must never touch a browser API directly.
- **No magic numbers.** Name them or move them to `data/`.

---

## 4. Performance & Memory Guidelines

- Target: constant 60 FPS (NFR-PERF-01).
- **Object pooling** for frequently created entities: floating damage numbers, particle emitters, projectiles.
- **No allocation in hot loops.** Avoid creating large temporary objects inside `update()`/`process()` called 60×/sec.
- Frame budgets: ≤16.6 ms total; render ≤10 ms; logic ≤4 ms.
- Web presence costs: texture and audio compression (WebP/AVIF, Opus/Vorbis) are defaults, not an optimisation pass.
- Performance is verified on a **real mid-range phone**, not a desktop emulator (NFR-WEB-05).

---

## 5. Asset Integration Rules

- Asset paths are loaded via a centralised `AssetManager` or a constant dictionary — **never** hard-coded string paths scattered across scripts.
- Load by **asset ID**, not path.
- If an asset is missing from `/assets/approved/`, fall back gracefully to a solid-colour block or procedural shape **with a debug warning** — never crash.
- Placeholders must be **obviously** placeholder so they cannot be mistaken for final art in a screenshot.
- Never modify a file in `/assets/approved/` without notifying the coordinator — approved art is a contract.

---

## 6. Testing Rules

- Every task card names the tests it must produce.
- Tests are deterministic: seeded RNG, no wall-clock dependency, no network.
- Test names state the expectation: `test_damage_is_never_below_one`.
- **Bug fix = regression test** that fails before the fix and passes after, then it joins the permanent suite.
- Never delete or weaken a failing test to make a build pass. Fix the cause or raise it.
- Run build checks and the test suite before declaring any task complete.

### Minimum test coverage for the combat core
Damage formula (including the floor of 1), height multiplier, facing bonuses, crit multiplier, CT accumulation and turn-order resolution, A\* path cost and elevation jump limits, save serialisation round-trip fidelity.

---

## 7. Browser Platform Rules (mandated by DEC-004)

- **Audio** must unlock on first user gesture; never assume playback succeeded.
- **`visibilitychange`** pauses the simulation; **delta time must be clamped** after a long frame.
- Canvas: fit-to-window with a scale policy; device pixel ratio **capped on mobile**; safe-area insets respected.
- Pointer coordinates translated through the canvas transform — never assume 1 CSS px = 1 render px.
- **Save to storage that is assumed evictable**; autosave on hide; never promise permanence.
- **Version string** must be visible in the debug overlay so any bug report maps to a build.
- The production output is a static folder, deployable from one documented command.

---

## 8. Git & Review Rules

- **Branch naming:** `task-<card-id>-<short-slug>` (e.g. `task-m1-01-scene-manager`).
- **Commit messages:** semantic, imperative, one logical change: `feat:`, `fix:`, `refactor:`, `test:`, `docs:` — and reference the task card (`feat(m1-01): add scene manager`).
- **Never commit directly to `main`**; changes arrive by pull request. **Never force-push a shared branch.**
- **A PR includes:** task card ID, what changed, how it was verified, a screenshot/clip for anything visual, known limitations.
- One PR = one task card (or a tight, explicitly-stated group).
- **Never commit:** build output, engine caches, generated folders, personal editor settings, secrets, API keys, files over 100 MB.

---

## 9. Definition of Done (per task card)

1. Acceptance criteria met and evidenced.
2. Tests written and green; nothing else broken.
3. Zero errors, zero warnings.
4. Runs in the built game, manually verified — **in a browser, including on a phone if the change affects layout or input.**
5. No placeholder where the card requires a real asset; where placeholders are expected they are obvious and logged.
6. Performance budget respected.
7. `CURRENT_STATE.md` updated (checkboxes + next task).
8. PR reviewable and self-contained.

---

## 10. Never do these without explicit instruction

- Invent gameplay rules, numbers or behaviours not written in `/ai`.
- Choose an engine, library, monetization method or platform feature.
- Add a feature that is not in `FEATURES.md`.
- Change design intent in `/ai`.
- Delete or rewrite another author's work to make a task easier.
- Ship a build containing placeholder art in a milestone whose exit criteria forbid it.
- Add analytics, telemetry, network calls or third-party SDKs.
- Weaken a performance budget to make something work.

**In each case: stop and ask the coordinator.**

---

## 11. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | House rules authored | Agent |
| 2026-09-18 | **Merged with the template's coding rules.** Adopted verbatim where present: KISS, single responsibility, immutability, type safety, the 300-line limit, state separation with the good/bad example, EventBus usage, object pooling, GC guidance, and the AssetManager/placeholder fallback rule. **Added:** §0 ten laws, determinism via seeded RNG, platform isolation (`src/platform/`, DEC-004), §7 browser platform rules, the combat-core minimum test coverage list, §9 Definition of Done, and §10 the never-do list. | Agent |
