import { describe, expect, it } from "vitest";
import { GridManager, GRID_WIDTH, GRID_HEIGHT } from "../../src/grid/GridManager";

describe("GridManager", () => {
  it("loads the default demo layout as a full 10x10 grid", () => {
    const grid = GridManager.fromLayout();
    expect(grid.width).toBe(GRID_WIDTH);
    expect(grid.height).toBe(GRID_HEIGHT);
    expect(grid.allTiles()).toHaveLength(GRID_WIDTH * GRID_HEIGHT);
  });

  it("returns undefined for out-of-bounds tiles", () => {
    const grid = GridManager.fromLayout();
    expect(grid.getTile(-1, 0)).toBeUndefined();
    expect(grid.getTile(0, -1)).toBeUndefined();
    expect(grid.getTile(GRID_WIDTH, 0)).toBeUndefined();
    expect(grid.getTile(0, GRID_HEIGHT)).toBeUndefined();
  });

  it("returns the exact tile data stored for an in-bounds coordinate", () => {
    const grid = GridManager.fromLayout();
    const tile = grid.getTile(0, 0);
    expect(tile).toEqual({
      x: 0,
      y: 0,
      elevation: 0,
      terrainType: "grass",
      isWalkable: true,
      occupantId: null,
    });
  });

  it("has visibly distinct elevation tiers in the demo layout (TASK-M1-02 acceptance)", () => {
    const grid = GridManager.fromLayout();
    const elevations = new Set(grid.allTiles().map((t) => t.elevation));
    expect(elevations).toEqual(new Set([0, 1, 2]));
  });

  it("throws when a tile record falls outside the grid bounds", () => {
    expect(() =>
      GridManager.fromLayout([
        { x: GRID_WIDTH, y: 0, elevation: 0, terrain_type: "grass", is_walkable: true },
      ]),
    ).toThrow(/outside the/);
  });

  it("throws when a tile is missing from the layout", () => {
    expect(() =>
      GridManager.fromLayout([
        { x: 0, y: 0, elevation: 0, terrain_type: "grass", is_walkable: true },
      ]),
    ).toThrow(/missing tile data/);
  });

  it("orders tiles back-to-front by ascending grid depth (x+y) for painter's-algorithm rendering", () => {
    const grid = GridManager.fromLayout();
    const ordered = grid.tilesInDrawOrder();
    expect(ordered).toHaveLength(GRID_WIDTH * GRID_HEIGHT);
    for (let i = 1; i < ordered.length; i++) {
      const prevDepth = ordered[i - 1]!.x + ordered[i - 1]!.y;
      const depth = ordered[i]!.x + ordered[i]!.y;
      expect(depth).toBeGreaterThanOrEqual(prevDepth);
    }
  });
});
