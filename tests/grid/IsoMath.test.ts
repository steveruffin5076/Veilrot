import { describe, expect, it } from "vitest";
import { IsoMath } from "../../src/grid/IsoMath";

describe("IsoMath", () => {
  const iso = new IsoMath(64, 32);

  it("round-trips every coordinate of a 10x10 grid exactly", () => {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const world = iso.gridToWorld({ x, y });
        const back = iso.worldToGrid(world);
        expect(back.x).toBe(x);
        expect(back.y).toBe(y);
      }
    }
  });

  it("maps grid origin to world origin", () => {
    expect(iso.gridToWorld({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
  });

  it("moves right along +x and down-right on screen (standard iso convention)", () => {
    const origin = iso.gridToWorld({ x: 0, y: 0 });
    const right = iso.gridToWorld({ x: 1, y: 0 });
    expect(right.x).toBeGreaterThan(origin.x);
    expect(right.y).toBeGreaterThan(origin.y);
  });

  it("elevationOffsetPx raises higher tiers up the screen (negative y)", () => {
    expect(iso.elevationOffsetPx(0, 16)).toBe(0);
    expect(iso.elevationOffsetPx(1, 16)).toBe(-16);
    expect(iso.elevationOffsetPx(2, 16)).toBe(-32);
  });
});
