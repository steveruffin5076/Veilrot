# QUALITY ASSURANCE & TEST PLAN

> **Maintained By:** User (Playtesting QA) & Claude Cowork / Arena.ai  
> **Status:** `ACTIVE`

---

## 1. Automated Test Specifications
- **Unit Tests:** Verify math formulas (Damage calculation, CT accumulation, A* pathfinding distances).
- **Regression Tests:** Verify save/load serialization restores squad stats and inventory with 100% fidelity.

---

## 2. Playtest Checklist Matrix

| Area | Test Case | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **Controls** | Click on valid movement tile | Unit moves to selected tile along shortest A* path. | [ ] Pending |
| **Controls** | Click on occupied tile | Selection fails or selects occupant; movement blocked. | [ ] Pending |
| **Combat** | Execute basic melee attack | Attacker plays animation/effect; defender loses calculated HP. | [ ] Pending |
| **Turn Queue**| Fast unit vs Slow unit | Unit with higher Speed acts more frequently across 10 turns. | [ ] Pending |
| **Win/Lose** | Reduce all enemies to 0 HP | Victory banner appears; controls disable; rewards screen opens.| [ ] Pending |
| **Save/Load** | Save during prep, restart app | Load game restores squad composition and gold correctly. | [ ] Pending |

---

## 3. Bug Triage & Issue Log

### Open Issues
*(Add discovered playtest issues here)*

- None currently logged.

### Resolved Issues
- None.
