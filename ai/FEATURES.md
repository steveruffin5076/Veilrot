# FEATURES.md — Feature Register

**Purpose:** The single list of every feature in Veilrot, with priority, milestone, status and dependencies. Nothing gets built that is not in this register, and nothing is "in" without a milestone assignment.

**Status:** ⚠️ BLOCKED on concept intake (D-01) and scope ceiling (D-09). The register format and lifecycle rules below are established and ready.

---

## 1. Feature record format

```
### FEAT-### — <Feature name>
- **Category:** Core Loop | Systems | Progression | Content | Narrative | UI/UX | Audio | Meta | Tools
- **Priority:** MUST (MVP) | SHOULD | COULD | WON'T (this release)
- **Milestone:** 1 Foundation | 2 Core Loop | 3 Vertical Slice | 4 Content | 5 Polish | 6 Release | Post-launch
- **Status:** IDEA | PROPOSED | APPROVED | IN DESIGN | SPEC'D | IN DEV | IMPLEMENTED | VERIFIED | CUT
- **Authority:** OWNER | AGENT PROPOSAL
- **Depends on:** FEAT-### / D-###
- **Owner-approval required?** Yes/No — and why
- **One-line behaviour:** what the player experiences
- **Requirements:** PR-### links
- **Acceptance criteria:** binary, testable
- **Assets needed:** asset IDs from ASSET_PIPELINE.md
- **Task cards:** links in /ai/tasks/
```

---

## 2. Status lifecycle

```
IDEA → PROPOSED → APPROVED → IN DESIGN → SPEC'D → IN DEV → IMPLEMENTED → VERIFIED
                                                 ↘ CUT (with a decision record)
```

**Gate rules**

1. A feature may not move to **SPEC'D** until it has acceptance criteria *and* asset IDs.
2. A feature may not move to **IN DEV** until it has at least one task card.
3. A feature may not move to **VERIFIED** until its QA test cases pass and it is migrated into the regression suite.
4. **CUT** requires a decision record in `DECISIONS.md` — features are not deleted silently.

---

## 3. Priority definitions

| Priority | Meaning | Rule |
|---|---|---|
| **MUST** | Required for the MVP to be considered the intended game | Ships in Milestone 3 at the latest |
| **SHOULD** | Important, adds real value, but the game survives without it | Schedules into Milestone 4 |
| **COULD** | Nice-to-have, low risk to lose | Only if schedule allows; first to cut |
| **WON'T** | Explicitly excluded this release | Logged so it is not re-litigated |

---

## 4. Register

> ⏳ **EMPTY — blocked on concept intake.**

No features can be entered until the concept is received, because the category list, the MVP definition and the priority calls all derive from the player-facing promise of the game. For reference, the register is expected to organise around these catalogue slots:

| Slot | What goes here | Earliest milestone |
|---|---|---|
| Core loop actions | The verb(s) the player repeats | 2 |
| Primary system | Combat / traversal / puzzle / management — whatever the concept names | 2 |
| Fail & retry model | How the player loses and recovers | 2 |
| Progression | What gets stronger and how | 3 |
| Content types | Levels, enemies, items, encounters | 4 |
| Meta systems | Menus, settings, saves, stats, achievements | 2–3 |
| Audio | Music, SFX, mix | 3–5 |
| Tools | Debug overlays, data editors, cheat menus | 1–2 |

---

## 5. Feature count targets

> ⏳ OPEN — set with D-09 (scope ceiling).

A healthy MVP has a small number of MUST features. Once the concept is known, this section will state an explicit ceiling (e.g. "at most N MUST features, at most M content units") and the register will be pruned to fit. Exceeding the ceiling is a scope escalation that requires an owner decision.

---

## 6. Cut log

| Feature | Cut on | Reason | Decision record |
|---|---|---|---|
| — | — | — | — |

---

## 7. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created with record format, lifecycle gates and priority definitions. Register empty pending intake. | Agent |
