import { describe, expect, it } from "vitest";
import { loadUnits } from "../../src/entities/UnitEntity";

describe("loadUnits", () => {
  it("loads the hero at (2,2) and the enemy at (7,7), per TASK-M1-04", () => {
    const units = loadUnits();
    const hero = units.find((u) => u.team === "hero");
    const enemy = units.find((u) => u.team === "enemy");

    expect(hero).toBeDefined();
    expect(hero).toMatchObject({ x: 2, y: 2, team: "hero" });
    expect(enemy).toBeDefined();
    expect(enemy).toMatchObject({ x: 7, y: 7, team: "enemy" });
  });

  it("maps snake_case stat data to a camelCase StatsComponent", () => {
    const [unit] = loadUnits([
      {
        id: "test_unit",
        asset_id: "test_asset",
        team: "hero",
        x: 0,
        y: 0,
        facing: "north",
        stats: {
          hp: 1,
          mp: 2,
          physical_attack: 3,
          physical_defense: 4,
          magic_attack: 5,
          magic_defense: 6,
          speed: 7,
          move_range: 8,
          jump_height: 9,
        },
      },
    ]);

    expect(unit).toBeDefined();
    expect(unit!.stats).toEqual({
      hp: 1,
      mp: 2,
      physicalAttack: 3,
      physicalDefense: 4,
      magicAttack: 5,
      magicDefense: 6,
      speed: 7,
      moveRange: 8,
      jumpHeight: 9,
    });
  });

  it("gives every unit a unique id", () => {
    const units = loadUnits();
    const ids = new Set(units.map((u) => u.id));
    expect(ids.size).toBe(units.length);
  });
});
