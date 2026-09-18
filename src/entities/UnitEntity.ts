import type { StatsComponent } from "./StatsComponent";
import unitsData from "../data/units.json";

export type Team = "hero" | "enemy";

/** Grid-relative facing (not screen-relative) — used later for flank/back-attack bonuses (FEATURES.md §3). */
export type FacingDirection = "north" | "east" | "south" | "west";

/** ARCHITECTURE.md §2: `[Unit] -> StatsComp, AnimationComp, SpriteComp, AIComp`. Pure data — no rendering. */
export interface UnitEntity {
  readonly id: string;
  readonly assetId: string;
  readonly team: Team;
  readonly x: number;
  readonly y: number;
  readonly facing: FacingDirection;
  readonly stats: StatsComponent;
}

interface UnitRecord {
  id: string;
  asset_id: string;
  team: Team;
  x: number;
  y: number;
  facing: FacingDirection;
  stats: {
    hp: number;
    mp: number;
    physical_attack: number;
    physical_defense: number;
    magic_attack: number;
    magic_defense: number;
    speed: number;
    move_range: number;
    jump_height: number;
  };
}

/** Loads unit placement + stats from data/ (DEC-002's "terrain and stat data loaded from data/"). */
export function loadUnits(
  records: readonly UnitRecord[] = unitsData as UnitRecord[],
): UnitEntity[] {
  return records.map((record) => ({
    id: record.id,
    assetId: record.asset_id,
    team: record.team,
    x: record.x,
    y: record.y,
    facing: record.facing,
    stats: {
      hp: record.stats.hp,
      mp: record.stats.mp,
      physicalAttack: record.stats.physical_attack,
      physicalDefense: record.stats.physical_defense,
      magicAttack: record.stats.magic_attack,
      magicDefense: record.stats.magic_defense,
      speed: record.stats.speed,
      moveRange: record.stats.move_range,
      jumpHeight: record.stats.jump_height,
    },
  }));
}
