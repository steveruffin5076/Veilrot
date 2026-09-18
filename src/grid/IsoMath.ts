/**
 * World<->grid coordinate conversion lives in exactly one module (ARCHITECTURE.md
 * §3.1) — never duplicate this math elsewhere. Pure and headless-testable.
 */
export interface GridPoint {
  x: number;
  y: number;
}

export interface WorldPoint {
  x: number;
  y: number;
}

export class IsoMath {
  constructor(
    private readonly tileWidthPx: number,
    private readonly tileHeightPx: number,
  ) {}

  gridToWorld(grid: GridPoint): WorldPoint {
    const halfW = this.tileWidthPx / 2;
    const halfH = this.tileHeightPx / 2;
    return {
      x: (grid.x - grid.y) * halfW,
      y: (grid.x + grid.y) * halfH,
    };
  }

  worldToGrid(world: WorldPoint): GridPoint {
    const halfW = this.tileWidthPx / 2;
    const halfH = this.tileHeightPx / 2;
    return {
      x: (world.x / halfW + world.y / halfH) / 2,
      y: (world.y / halfH - world.x / halfW) / 2,
    };
  }

  /**
   * Vertical pixel offset for rendering a tile at `elevation` tiers — a pure
   * presentation value, not part of the invertible world<->grid mapping above
   * (picking/collision stays on the ground plane).
   */
  elevationOffsetPx(elevation: number, elevationStepPx: number): number {
    // Avoid returning -0 for elevation 0, which fails strict equality checks.
    return elevation === 0 ? 0 : -elevation * elevationStepPx;
  }
}
