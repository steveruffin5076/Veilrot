# QUALITY ASSURANCE & TEST PLAN

> **Maintained By:** Owner (Playtesting QA) & Claude Cowork / Arena.ai
> **Status:** `DRAFT` — framework ready; test content ⏳ OPEN pending concept approval (D-01a) and engine choice (D-02)
> **Last Updated:** 2026-09-18

---

## 1. Quality Objectives

| Objective | Measure |
|---|---|
| No progression-blocking bugs at release | Zero open blockers/criticals on the release-candidate build |
| No crash on load | Verified on a fresh browser with cache disabled, and a clean Android install |
| Core loop stable under abuse | 30-minute adversarial session with no crash or soft-lock |
| Performance holds | NFR-PERF-01 met **on a real mid-range phone**, at worst-case density |
| Saves never corrupt | Corrupt-save injection + migration test pass |
| Every MUST feature has proof | 100% of MUST features have a passing case in the regression suite |

---

## 2. Test Levels

| Level | Covers | Who | When |
|---|---|---|---|
| **L1 — Unit** | Pure logic: damage, CT, pathfinding, serialisation (headless, deterministic) | Implementer | With every task |
| **L2 — Integration** | Systems together: save↔progression, UI↔gameplay, asset↔loader | Implementer | Per feature |
| **L3 — Automated smoke** | Boot → menu → battle → resolution → quit, scripted + payload budget check | CI | Every push to mainline |
| **L4 — Manual functional** | Full test suite against acceptance criteria | Human + agent checklist | Per milestone |
| **L5 — Adversarial** | Spam input, pause during transitions, quit mid-save, kill the tab, unplug input devices | Human | M3 onward |
| **L5b — Browser matrix (DEC-004)** | Real desktop + mobile browsers, own-focus, caching, permissions, cold load | Human | M3 onward |
| **L6 — Playtest** | Is it fun and understandable? | External testers | M3 onward |
| **L7 — Release validation** | Fresh-device load from the public URL; clean Android install; full completion | Owner | M6 |

---

## 3. Automated Test Specifications

**Unit tests** — verify the maths:
- Damage formula, including the `Max(1, …)` floor and the height multiplier.
- Facing modifiers (side +15% hit, back +30% crit — values pending D-06).
- Crit multiplier (1.5×).
- CT accumulation and turn-order resolution over N ticks, including tie-breaking.
- A\* path cost, unreachable-target handling, and elevation jump limits.
- Range flood-fill correctness against known grids.

**Regression tests:**
- Save/load round-trip restores squad stats, inventory and campaign progress with 100% fidelity.
- Save schema migration from previous versions.
- Corrupt/truncated save is detected and reported, never loaded blindly.

**Smoke test (CI, every push):**
1. Boot. 2. Reach title screen. 3. Start a battle. 4. Resolve one full turn cycle. 5. Trigger a victory. 6. Save. 7. Reload. 8. Confirm state. 9. Assert the built payload is within budget.

---

## 4. Playtest Checklist Matrix

| Area | Test case | Expected result | Status |
|---|---|---|---|
| Controls | Click/tap a valid movement tile | Unit moves along the shortest A\* path | [ ] Pending |
| Controls | Click an occupied tile | Selection fails or selects the occupant; movement blocked | [ ] Pending |
| Controls | Play an entire battle with **touch only** | No action requires hover, right-click or precision drag (REQ-IN-04) | [ ] Pending |
| Controls | Switch from mouse to gamepad mid-battle | On-screen prompts switch glyph sets (REQ-IN-05) | [ ] Pending |
| Combat | Execute a basic melee attack | Animation plays; defender loses exactly the calculated HP | [ ] Pending |
| Combat | Attack from height +2 | Damage includes the +10% per tier multiplier (DEC-003) | [ ] Pending |
| Combat | Inspect a target before committing | Damage, hit chance and crit chance are shown (REQ-CBT-04) | [ ] Pending |
| Turn queue | Fast unit vs slow unit over 10 turns | Higher Speed acts more frequently; order matches the timeline UI | [ ] Pending |
| Win/lose | Reduce all enemies to 0 HP | Victory banner, controls disable, rewards screen opens | [ ] Pending |
| Win/lose | All heroes reduced to 0 HP | Defeat flow triggers; no soft-lock | [ ] Pending |
| Save/load | Save during prep, reload the page | Squad, gold and progress restored correctly | [ ] Pending |
| Save/load | Export a save, clear site data, import it | Progress fully restored (REQ-SAV-05) | [ ] Pending |
| Save/load | Inject a corrupted save | Detected and reported; no crash, no silent bad load | [ ] Pending |
| Accessibility | Enable colour-blind range overlays | Move/attack ranges remain distinguishable without colour (NFR-ACC-01) | [ ] Pending |
| Accessibility | Increase text scale | No clipping, no overlap, everywhere | [ ] Pending |

---

## 5. Web-Specific Test Obligations (mandated by DEC-004)

*The browser failures that ship silently if nobody tests for them. Each becomes a permanent test case.*

| # | Test | Why |
|---|---|---|
| W-01 | **Cold load with cache disabled** on a fresh device/browser profile | The classic "works for me" failure — the developer has the assets cached |
| W-02 | First-load payload and time-to-first-play on a throttled connection | NFR-WEB-01/02 — the player's first impression |
| W-03 | **Audio unlock:** reload → click through → audio starts; confirm no silent failure | Browsers block autoplay; silent audio reads as a broken game |
| W-04 | Background the tab for 60 s, return | No lost input, no time-warp teleporting units, no crash (`visibilitychange` + delta clamp) |
| W-05 | Orientation change and window resize mid-battle | Layout breaks are invisible in a fixed-size dev window |
| W-06 | Save survives reload; then clear site data and confirm graceful handling | Browser storage is evictable (REQ-SAV-06) |
| W-07 | **Touch-only playthrough** — complete a full battle with no mouse/keyboard | Guarantees the mobile promise is real |
| W-08 | Real mid-range Android device, supported browsers | Emulators lie about mobile performance |
| W-09 | Deploy a new build; confirm returning players never see a stale/corrupt mix | Service-worker/cache correctness |
| W-10 | Offline / connection drop mid-session | Cached build must keep working |
| W-11 | Long session under memory pressure with other tabs open | Mobile browsers kill tabs; progress must not vanish |

**Rule:** **W-01 and W-03 run on every release candidate without exception** — they are the two failures that make a browser game look unfinished.

---

## 6. Bug Triage & Issue Log

| Severity | Definition | Release tolerance |
|---|---|---|
| **Blocker** | Cannot launch, cannot progress, save destroyed, crash | **Zero** |
| **Critical** | Major feature broken, exploitable, or a major visual/audio failure | **Zero** |
| **Major** | Feature works but wrong; visible glitch; bad performance in a common case | Documented with a fix plan |
| **Minor** | Cosmetic, rare, low impact | Documented in known issues |
| **Trivial** | Polish nits | Optional |

**Triage rule:** severity ≠ priority. Every open bug gets an explicit disposition: *fix now* · *fix by milestone X* · *accept as known issue* · *won't fix (reason)*. No bug sits unlabelled.

### Open Issues
*(Add discovered playtest issues here — with build version, scenario, expected vs actual, and severity.)*

- None logged yet (project not yet implemented).

### Resolved Issues
- None.

---

## 7. Playtest Protocol

Purpose: to learn, not to be reassured. (Relevant from M3.)

1. **No coaching.** If the tester cannot figure out the first action, that is a finding, not their failure.
2. **Record** the session and the input, not just the outcome.
3. **Silent observation first**, questions afterwards.
4. **Ask after, not during:** *What were you trying to do here? · What did you expect to happen? · What was confusing? · What was boring? · Would you play more, and why?*
5. **Log findings verbatim**, then triage into bug or design issues with IDs.
6. The **owner decides** which feedback becomes a change. Feedback is data, not instructions.

### Playtest Log

| # | Date | Build | Tester | Duration | Key findings | Actions |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

---

## 8. Release Gate Checklist

- [ ] All MUST features VERIFIED with passing test cases.
- [ ] Full regression suite green on the release-candidate build.
- [ ] Zero blockers, zero criticals; all others have an explicit disposition.
- [ ] NFR performance budgets verified **on target hardware incl. a real phone**.
- [ ] Accessibility checklist verified end to end.
- [ ] Web obligations **W-01…W-11** pass on real devices.
- [ ] Fresh-device load from the public URL (no cache) → complete playthrough → clean exit, by someone who did not build it.
- [ ] Save corruption injection passes on the RC build; export/import verified.
- [ ] Cached-build update path verified (a live deploy reaches existing players).
- [ ] Android closed-testing requirement satisfied if shipping to Play (D-23).
- [ ] Credits and licence attributions complete and accurate.
- [ ] Rollback/hotfix path rehearsed — **including rolling back a bad web deploy**.
- [ ] Owner sign-off recorded in `DECISIONS.md`.

---

## 9. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Test framework authored (levels, severity model, playtest protocol, release gate) | Agent |
| 2026-09-18 | **Merged with the template's QA plan.** Adopted: automated unit/regression test specifications for damage/CT/pathfinding/serialisation, the playtest checklist matrix, and the bug triage log structure. **Added:** test levels L1–L7 incl. L5b browser matrix, the web obligations **W-01…W-11** (DEC-004), the smoke test, severity tolerances, the playtest protocol, and the release gate checklist. Extended the playtest matrix with touch-only, glyph-switch, damage-preview, export/import and accessibility cases. | Agent |
