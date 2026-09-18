/**
 * Terrain types named after the assets already specified in ASSET_PIPELINE.md §6
 * (`tile_grass_isometric`, `tile_stone_isometric`, `tile_water_isometric`).
 * Movement cost / defence modifier per type is an open spec gap (FEATURES.md §5,
 * gap #2) — not implemented here.
 */
export type TerrainType = "grass" | "stone" | "water";

/** ARCHITECTURE.md §3.1: `Tile = { x, y, elevation, terrain_type, occupant_id, is_walkable }`. */
export interface Tile {
  readonly x: number;
  readonly y: number;
  readonly elevation: number;
  readonly terrainType: TerrainType;
  readonly isWalkable: boolean;
  readonly occupantId: string | null;
}
