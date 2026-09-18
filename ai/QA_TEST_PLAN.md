# QA_TEST_PLAN.md — Quality Assurance & Test Strategy

**Purpose:** Defines how Veilrot is proven to work — automatically where possible, manually where necessary — and what "shippable" measurably means.

**Status:** Framework established; test content ⏳ OPEN pending concept intake and D-02 (engine, which determines the test runner).

---

## 1. Quality objectives

| Objective | Measure |
|---|---|
| No progression-blocking bugs at release | Zero open blockers/criticals on the RC build |
| No crash-on-boot | Verified on a clean install of the shipped build |
| Core loop is stable under abuse | 30-minute adversarial session with no crash or soft-lock |
| Performance holds | NFR-01/02 met on target hardware at worst-case density |
| Saves never corrupt | Corrupt-save injection test passes; migration test passes |
| Every MUST feature has proof | 100% of MUST features have a passing QA case in the regression suite |

---

## 2. Test levels

| Level | What it covers | Who | When |
|---|---|---|---|
| **L1 — Unit** | Pure logic, math, data parsing, state machines (headless, deterministic) | Claude Code | With every task |
| **L2 — Integration** | Systems working together: save↔progression, UI↔gameplay, asset↔loader | Claude Code | Per milestone feature |
| **L3 — Automated smoke** | Boot → menu → new game → core loop → quit, scripted | CI | Every push to the mainline |
| **L4 — Manual functional** | Full test case suite against the acceptance criteria | Human + agent checklist | Per milestone exit |
| **L5 — Adversarial / exploratory** | Breaking it on purpose: spam input, alt-tab, pause during transitions, quit mid-save, unplug devices | Human | Milestone 3 onward |
| **L6 — Playtest** | Is it actually fun and understandable? | External testers | Milestone 3 onward |
| **L7 — Release validation** | Clean-machine install of the shipped build, full completion | Owner | Milestone 6 |

---

## 3. Test case format

```
### TC-### — <title>
- **Level:** L1–L7
- **Traces to:** PR-### / FEAT-###
- **Preconditions:** <state the game must be in>
- **Steps:** 1. … 2. … 3. …
- **Expected result:** <observable, binary>
- **Actual result:** <filled at execution>
- **Status:** Pass | Fail | Blocked | Not run
- **Build/commit:** <hash>
- **Notes / screenshots:**
```

**Rule:** a test case must be executable by someone who did not write it. If it needs the author to interpret it, it is not a test.

---

## 4. Traceability matrix

Every requirement and feature must map to at least one test. Empty cells are defects in the documentation, not just in the game.

| Requirement | Feature | Test case(s) | Status |
|---|---|---|---|
| ⏳ PR-1xx | ⏳ FEAT-### | ⏳ TC-### | ⏳ |
| NFR-01 (60 fps) | — | perf harness + debug overlay | 🔵 framework ready |
| NFR-09 (save integrity) | — | corrupt-save injection, migration test | 🔵 framework ready |
| NFR-10 (accessibility) | — | a11y checklist in `UX_UI.md` §7 | 🔵 framework ready |
| NFR-11 (no hard-coded strings) | — | static scan of source for string literals in UI paths | 🔵 framework ready |

---

## 5. Smoke test (the 5-minute always-green check)

> 🔵 PROPOSAL — finalised once the game exists. Intended shape:

1. Launch the build. 2. Reach the main menu within NFR-03. 3. Start a new game. 4. Exercise the core loop for 60 seconds. 5. Pause, open settings, change one value, close. 6. Save. 7. Quit to menu. 8. Continue the save — state matches. 9. Quit the application cleanly.

Any failure here blocks the branch, regardless of what else was accomplished.

---

## 6. Regression suite

- Grows monotonically: every fixed bug adds a permanent case; nothing is removed without a decision record.
- Must be runnable **headlessly in CI** for L1–L3; L4–L7 are human-executed checklists with recorded evidence.
- Runs before every milestone gate and before every release candidate.
- A red regression suite blocks merging. There is no "we'll fix it later" path for regressions.

---

## 7. Bug severity & triage

| Severity | Definition | Release tolerance |
|---|---|---|
| **Blocker** | Cannot launch, cannot progress, save destroyed, crash | **Zero** |
| **Critical** | Major feature broken or exploitable; major visual/audio failure | **Zero** |
| **Major** | Feature works but wrong; visible glitch; bad performance in common case | Documented, with a fix plan |
| **Minor** | Cosmetic, rare, low-impact | Documented in known issues |
| **Trivial** | Polish nits | Optional |

**Triage rule:** severity ≠ priority. Every open bug gets an explicit disposition — *fix now*, *fix by milestone X*, *accept as known issue*, or *won't fix with reason*. No bug sits in an unlabelled state.

---

## 8. Playtest protocol

For Milestone 3 onward; the purpose is to learn, not to be reassured.

1. **No coaching.** Do not tell the tester how to play. If they cannot figure out the first action, that is a finding, not their failure.
2. **Record the session** (screen + face/voice if possible) and the input, not just the outcome.
3. **Silent observation first**, questions afterwards.
4. **Ask after, not during:** *What were you trying to do here?* · *What did you expect to happen?* · *What was confusing?* · *What was boring?* · *Would you play more, and why?*
5. **Log findings verbatim** in this document, as quotes, then triage into bug or design issues with IDs.
6. **Owner decides** which feedback becomes a change — feedback is data, not instructions.

### Playtest log

| # | Date | Build | Tester | Duration | Key findings | Actions |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

---

## 9. Release gate checklist

- [ ] All MUST features VERIFIED with passing test cases.
- [ ] Full regression suite green on the RC build.
- [ ] Zero blockers, zero criticals.
- [ ] All other bugs have an explicit disposition.
- [ ] NFR performance budgets verified on target hardware.
- [ ] Accessibility checklist verified end to end.
- [ ] Clean-machine install → complete playthrough → clean exit, by a person who did not build it.
- [ ] Save corruption injection test passes on the RC build.
- [ ] Credits and licence attributions complete and accurate.
- [ ] Rollback/hotfix path rehearsed.
- [ ] Owner sign-off recorded in `DECISIONS.md`.

---

## 10. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. Test levels, case format, severity model, playtest protocol and release gate established. Test content ⏳ OPEN pending intake and engine choice. | Agent |
