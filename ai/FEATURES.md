# GAMEPLAY FEATURES & MECHANICS SPECIFICATION

> **Status:** `ACTIVE`  
> **Last Updated:** YYYY-MM-DD  
> **Maintained By:** Claude Cowork / Arena.ai  
> **Target Consumer:** Cursor AI / Claude Code

---

## 1. Unit Attributes & Character Stats

| Stat Name | Key | Description | Formula / Range |
| :--- | :--- | :--- | :--- |
| **Hit Points** | `HP` | Current vitality; unit is incapacitated at 0 HP. | Base 80–500 (scales per level/job) |
| **Mana Points** | `MP` | Resource spent to cast magic and special abilities. | Base 20–200 |
| **Physical Attack** | `PATK` | Scaling factor for basic attacks and melee skills. | 10–100 |
| **Physical Defense** | `PDEF` | Flat/Percentage mitigation against physical damage. | 5–80 |
| **Magic Attack** | `MATK` | Scaling factor for spells and arcane damage. | 10–100 |
| **Magic Defense** | `MDEF` | Flat/Percentage mitigation against magical damage. | 5–80 |
| **Speed** | `SPD` | Rate of Charge Time (CT) accumulation. | 6–18 |
| **Move Range** | `MOV` | Maximum grid tiles unit can traverse per turn. | 3–5 tiles |
| **Jump Height** | `JMP` | Maximum elevation difference unit can climb/descend. | 2–4 height units |

---

## 2. Job Class Tree & Synergies

```
[Squire (Basic Melee)] ───┬───> [Knight (Heavy Armor / Rend Skills)]
                          └───> [Archer (Ranged Bows / High Elevation)]

[Chemist (Items/Heals)] ──┬───> [White Mage (Holy Magic / Cures)]
                          └───> [Black Mage (Elemental Fire/Ice/Lightning)]
```

### 2.1 Job Progression Rules
- Performing actions awards **EXP** (Unit Level) and **JP** (Job Points).
- JP is spent in the squad menu to unlock active skills and passive reaction abilities.
- Unlocking Level 2 in Squire unlocks Knight; Level 2 in Chemist unlocks White Mage.
- **Dual-Classing:** Units equip 1 Primary Job Skillset (e.g. Knight Arts) + 1 Secondary Skillset (e.g. Item Lore).

---

## 3. Enemy AI Behavior Rules (State Trees)

```
                       [EVALUATE ACTIVE TURN]
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [HP <= 25% & HAS ITEM?]          [HP > 25% NORMAL]
                 │                               │
         ┌───────┴───────┐               ┌───────┴───────┐
         ▼               ▼               ▼               ▼
    [USE HEAL ITEM] [RETREAT SAFELY] [FIND WEAKEST]  [ATTACK FROM]
                                     [TARGET IN RNG] [HEIGHT/FLANK]
```

1. **Self-Preservation:** If HP falls below 25% and unit possesses healing potions/magic, prioritize self-healing or retreating to cover.
2. **Target Prioritization:**
   - Priority 1: Target that can be eliminated in 1 hit (`Target.HP <= EstimatedDamage`).
   - Priority 2: Target with lowest Physical Defense / vulnerable flank (back attack).
   - Priority 3: Soft support units (e.g. White Mages, Chemists).
3. **Positioning Strategy:** Move to tiles offering height advantage (+1 elevation tier) or terrain defense bonus (e.g. stone walls / bushes).
