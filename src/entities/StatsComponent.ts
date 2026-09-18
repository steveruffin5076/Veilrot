/**
 * Base stat block (FEATURES.md §1). Values are 🔵 PROPOSAL example ranges
 * from the template, not tuned balance numbers (D-06 is still open) — the
 * actual per-unit values live in `src/data/units.json`, never inline.
 */
export interface StatsComponent {
  readonly hp: number;
  readonly mp: number;
  readonly physicalAttack: number;
  readonly physicalDefense: number;
  readonly magicAttack: number;
  readonly magicDefense: number;
  readonly speed: number;
  readonly moveRange: number;
  readonly jumpHeight: number;
}
