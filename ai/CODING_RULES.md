# CODING_RULES.md — House Rules for Claude Code

**Purpose:** The behavioural contract for whoever writes the code. These rules exist so that many independent implementation sessions produce one coherent game rather than a pile of unrelated patches.

**Applies to:** all code, tests, data files and commit messages in this repository.
**Precedence:** design docs in `/ai` > these rules > personal preference. If a rule conflicts with an approved design doc, the design doc wins, and the conflict is raised with the coordinator.

---

## 0. The ten laws

1. **Read `/ai` before writing code.** Start with `CURRENT_STATE.md`, then the task card, then the documents it references. Never work from memory of an earlier session.
2. **Never change design intent in code.** If the docs are ambiguous or wrong, **stop and raise it** — do not pick an interpretation and proceed.
3. **Do not edit `/ai/*.md` design documents.** Only the coordinator maintains them. Code may not silently redefine the game.
4. **Work task-card by task-card.** One card = one purpose = one reviewable change.
5. **Tunables live in data, never inline.** If a designer would want to change it, it belongs in a data file.
6. **Every task card's acceptance criteria must be demonstrably met** before the card is closed, with evidence.
7. **Missing art never blocks code.** Load by asset ID and fall back to an obvious procedural placeholder. See `ASSET_PIPELINE.md` § mock protocol.
8. **Leave no rubble.** No commented-out code blocks, no orphan files, no TODOs without a task-card reference, no debug prints left in shipped paths.
9. **Performance is a feature.** Check the debug frame-time overlay after anything that touches per-frame work.
10. **When in doubt, ask the coordinator — do not guess.**

---

## 1. Before you start (per-session checklist)

- [ ] Pulled the latest branch; working tree clean.
- [ ] Read the task card and every document it references.
- [ ] Confirmed the engine/toolchain is installed at the documented version.
- [ ] Confirmed the task's dependencies are actually complete (not assumed).
- [ ] Identified which asset IDs the task needs; confirmed what will be a placeholder.

## 2. Before you finish (per-task checklist)

- [ ] Acceptance criteria met and self-verified.
- [ ] Tests written (see §6) and passing.
- [ ] Compiles with **zero errors and zero warnings**.
- [ ] No hard-coded player-facing strings (all through the localization system).
- [ ] No inline tunables that belong in data.
- [ ] New asset dependencies registered as asset IDs with a spec entry.
- [ ] Manual smoke test performed: launch the game and exercise the change.
- [ ] Frame-time overlay checked if per-frame code was touched.
- [ ] Commit message references the task card.

---

## 3. Code conventions

- **Naming:** `PascalCase` types/classes · `camelCase` functions & variables · `SCREAMING_SNAKE_CASE` constants · `snake_case` data-file keys and asset IDs.
- **File naming:** `snake_case` for data and asset files; follow the engine's idiomatic convention for source files (record it here once D-02 is decided).
- **One responsibility per file.** A file that needs "and" to describe it should be split.
- **Functions:** one job, early returns over nesting, no function longer than ~50 lines without justification.
- **No magic numbers.** Name them or move them to data.
- **Comments explain *why*, not *what*.** The code says what.
- **Explicit over clever.** This codebase will be read far more than it is written.
- **Errors:** fail loudly and early in development; handle gracefully and log in release. Never swallow an exception silently.
- **Determinism:** all randomness goes through the single seeded RNG service (`ARCHITECTURE.md` §7). Never call the platform RNG directly.
- **Localisation:** every player-facing string goes through the string table, from the very first string ever written.

---

## 4. Architecture discipline

- Respect the layering in `ARCHITECTURE.md` §3. UI does not contain game logic; gameplay does not query UI directly; nobody reaches into another system's internals.
- Systems communicate through explicit, documented interfaces — not by side effects or globals.
- New dependencies (libraries, plugins, addons) require **owner approval** and a decision record before being added.
- New systems require a documented entry in `ARCHITECTURE.md` §3 (coordinator's job — request it, do not add it yourself).

---

## 5. Asset & data rules

- Load assets by **ID**, never by a hard-coded path.
- Missing asset → placeholder, plus a single clear warning line in the log naming the asset ID.
- Never commit: build output, engine caches, `.import`/generated folders, personal editor settings, files > 100 MB, or anything under a source-control ignore rule.
- Large binaries (audio, video, big textures) follow the external-storage convention decided in `ASSET_PIPELINE.md` before being committed.
- Never modify a file in `/assets` that is marked APPROVED without notifying the coordinator — approved art is a contract.
- Placeholder assets must be **obviously** placeholder (primitive shape, flat distinct colour, asset-ID label). A placeholder must never be mistakable for final art.

---

## 6. Testing rules

- Every task card names the tests it must produce.
- Game logic must be testable **headlessly**, without rendering or a running scene.
- Tests must be deterministic: seeded RNG, no wall-clock dependency, no network.
- Test names state the expectation: `test_player_dies_when_health_reaches_zero`.
- Bug fix = regression test that fails before the fix and passes after, then the case is added to the permanent suite.
- Never delete or weaken a failing test to make a build pass. Fix the cause or raise it.

---

## 7. Git & review rules

- **Branch naming:** `task-<card-id>-<short-slug>` (e.g. `task-m1-004-asset-service`).
- **Commit messages:** imperative mood, one logical change, reference the card: `M1-004: load assets by id with placeholder fallback`.
- **Never commit directly to `main`.** Changes arrive by pull request.
- **Never force-push a shared branch.**
- **A PR must include:** the task card ID, what changed, how it was verified, a screenshot/clip for anything visual, and any known limitations.
- **One PR = one task card** (or a tight, explicitly-stated group).
- Rebase/merge cleanly — no conflict markers, no stray files, no reformatting of unrelated code.
- Do not commit secrets, API keys, certificates, or personal data.

---

## 8. Definition of Done (per task card)

A card is Done when **all** apply:

1. Acceptance criteria from the card are met and evidenced.
2. Tests written and green; nothing else broken.
3. Zero errors, zero warnings.
4. Runs in the built game, manually verified.
5. No placeholder substituted where the card requires a real asset; where placeholders are expected, they are obvious and logged.
6. Performance budget respected.
7. `CURRENT_STATE.md` update requested from the coordinator (the implementer does not edit it).
8. PR reviewable and self-contained.

---

## 9. Things Claude Code must never do without explicit instruction

- Invent gameplay rules, numbers, or behaviours not written in `/ai`.
- Choose an engine, library, monetization method, or platform feature.
- Add a feature that is not in `FEATURES.md`.
- Change a design document in `/ai`.
- Delete or rewrite another author's work to make a task easier.
- Ship a build with placeholder art in a milestone whose exit criteria forbid it.
- Add analytics, telemetry, network calls, or third-party SDKs.
- Weaken the performance budget to make something work.

**In each of those cases: stop and ask the coordinator.**

---

## 10. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. Engine-specific conventions (source-file naming, build commands, toolchain version) will be appended once D-02 is decided. | Agent |
