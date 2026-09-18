import Phaser from "phaser";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  FIXED_STEP_MS,
  MAX_FIXED_STEPS_PER_FRAME,
  SCENE_KEYS,
} from "../GameConfig";
import { SceneManager } from "../SceneManager";
import { FixedTimestep } from "../../utils/FixedTimestep";
import { GridManager } from "../../grid/GridManager";
import { IsoMath } from "../../grid/IsoMath";
import { buildIsoTileBlockFaces } from "../../utils/IsoBlockGeometry";
import { darken } from "../../utils/Color";
import tileConfig from "../../data/tile_config.json";

const {
  tile_width_px: TILE_WIDTH_PX,
  tile_height_px: TILE_HEIGHT_PX,
  elevation_step_px: ELEVATION_STEP_PX,
} = tileConfig;

// Grid-diamond centre for grid (0,0); chosen so the 10x10 battlefield (visual
// span ~640x320px, plus up to 2 elevation tiers of headroom) sits centred in
// the 1280x720 canvas (TASK-M1-01's GAME_WIDTH/GAME_HEIGHT).
const GRID_ORIGIN_X = GAME_WIDTH / 2;
const GRID_ORIGIN_Y = 220;

/** Placeholder elevation-tier palette (DEC-002) — no approved height-block art yet (ASSET_PIPELINE.md §6). */
const ELEVATION_TIER_COLORS: Record<number, number> = {
  0: 0x3f6b35,
  1: 0x6b5a35,
  2: 0x8a8a8a,
};
const LEFT_FACE_SHADE = 0.75;
const RIGHT_FACE_SHADE = 0.55;

/**
 * TASK-M1-02: renders the 10x10 grid (GridManager) in isometric projection
 * (IsoMath) with visibly distinct elevation tiers. Tile/terrain data comes
 * from data/ (DEC-002); no approved tile art exists yet, so every tile is an
 * obvious flat-colour placeholder block, not final art.
 */
export class BattleScene extends Phaser.Scene {
  private fixedStep = new FixedTimestep(FIXED_STEP_MS, MAX_FIXED_STEPS_PER_FRAME);
  private simTicks = 0;
  private readonly isoMath = new IsoMath(TILE_WIDTH_PX, TILE_HEIGHT_PX);

  constructor() {
    super(SCENE_KEYS.BATTLE);
  }

  create(): void {
    SceneManager.notifyEnter(this.scene.key);

    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x14181c).setOrigin(0, 0);
    this.add
      .text(12, 12, "[PLACEHOLDER grid_battlefield_demo_m1]", {
        fontFamily: "monospace",
        fontSize: "12px",
        color: "#5a7a5a",
      })
      .setOrigin(0, 0);

    this.renderGrid(GridManager.fromLayout());
  }

  private renderGrid(grid: GridManager): void {
    const graphics = this.add.graphics();

    for (const tile of grid.tilesInDrawOrder()) {
      const world = this.isoMath.gridToWorld(tile);
      const groundCenter = { x: GRID_ORIGIN_X + world.x, y: GRID_ORIGIN_Y + world.y };
      const elevationOffsetPx = this.isoMath.elevationOffsetPx(tile.elevation, ELEVATION_STEP_PX);
      const baseColor = ELEVATION_TIER_COLORS[tile.elevation] ?? ELEVATION_TIER_COLORS[0]!;

      const faces = buildIsoTileBlockFaces(
        groundCenter,
        elevationOffsetPx,
        TILE_WIDTH_PX,
        TILE_HEIGHT_PX,
      );

      if (tile.elevation > 0) {
        graphics.fillStyle(darken(baseColor, RIGHT_FACE_SHADE), 1);
        graphics.fillPoints(toPoints(faces.right), true);
        graphics.fillStyle(darken(baseColor, LEFT_FACE_SHADE), 1);
        graphics.fillPoints(toPoints(faces.left), true);
      }

      graphics.fillStyle(baseColor, 1);
      graphics.fillPoints(toPoints(faces.top), true);
      graphics.lineStyle(1, 0x000000, 0.25);
      graphics.strokePoints(toPoints(faces.top), true);
    }
  }

  override update(_time: number, delta: number): void {
    this.fixedStep.advance(delta, () => {
      this.simTicks += 1;
    });
  }

  /** Exposed for the debug overlay; not gameplay state, purely instrumentation. */
  get simulationTicks(): number {
    return this.simTicks;
  }
}

function toPoints(flat: number[]): Phaser.Math.Vector2[] {
  const points: Phaser.Math.Vector2[] = [];
  for (let i = 0; i < flat.length; i += 2) {
    points.push(new Phaser.Math.Vector2(flat[i], flat[i + 1]));
  }
  return points;
}
