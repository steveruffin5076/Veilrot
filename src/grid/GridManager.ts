import type { Tile, TerrainType } from "./Tile";
import layoutData from "../data/battlefield_demo_m1.json";

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 10;

interface TileRecord {
  x: number;
  y: number;
  elevation: number;
  terrain_type: TerrainType;
  is_walkable: boolean;
}

/**
 * 2D grid data model (ARCHITECTURE.md §3.1). Pure data + accessors — no
 * rendering (CODING_RULES.md §3 state separation); a Scene consumes this via
 * `IsoMath` to draw it.
 */
export class GridManager {
  private constructor(private readonly tiles: readonly (readonly Tile[])[]) {}

  /** Builds the grid from data/ (DEC-002's "terrain and stat data loaded from data/"). */
  static fromLayout(records: readonly TileRecord[] = layoutData as TileRecord[]): GridManager {
    const grid: Tile[][] = Array.from({ length: GRID_HEIGHT }, () => new Array<Tile>(GRID_WIDTH));

    for (const record of records) {
      if (record.x < 0 || record.x >= GRID_WIDTH || record.y < 0 || record.y >= GRID_HEIGHT) {
        throw new Error(
          `[GridManager] tile (${record.x},${record.y}) is outside the ${GRID_WIDTH}x${GRID_HEIGHT} grid`,
        );
      }
      const row = grid[record.y];
      if (!row) {
        throw new Error(`[GridManager] tile (${record.x},${record.y}) has no row — this is a bug`);
      }
      row[record.x] = {
        x: record.x,
        y: record.y,
        elevation: record.elevation,
        terrainType: record.terrain_type,
        isWalkable: record.is_walkable,
        occupantId: null,
      };
    }

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (!grid[y]?.[x]) {
          throw new Error(`[GridManager] missing tile data for (${x},${y})`);
        }
      }
    }

    return new GridManager(grid);
  }

  getTile(x: number, y: number): Tile | undefined {
    if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) return undefined;
    return this.tiles[y]?.[x];
  }

  get width(): number {
    return GRID_WIDTH;
  }

  get height(): number {
    return GRID_HEIGHT;
  }

  /** All tiles, unordered. */
  allTiles(): Tile[] {
    return this.tiles.flatMap((row) => row);
  }

  /**
   * Tiles ordered back-to-front for isometric painter's-algorithm rendering:
   * ascending grid depth (x+y), which is monotonic with on-screen Y
   * (`IsoMath.gridToWorld`), then ascending elevation as a tiebreaker.
   */
  tilesInDrawOrder(): Tile[] {
    return this.allTiles().sort((a, b) => {
      const depthDiff = a.x + a.y - (b.x + b.y);
      if (depthDiff !== 0) return depthDiff;
      return a.elevation - b.elevation;
    });
  }
}
