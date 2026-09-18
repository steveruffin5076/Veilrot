import Phaser from "phaser";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  FIXED_STEP_MS,
  MAX_FIXED_STEPS_PER_FRAME,
  SCENE_KEYS,
} from "../GameConfig";
import { SceneManager } from "../SceneManager";
import { EventBus, type GridCoordinates } from "../EventBus";
import { FixedTimestep } from "../../utils/FixedTimestep";
import { GridManager } from "../../grid/GridManager";
import { IsoMath } from "../../grid/IsoMath";
import { InputHandler } from "../InputHandler";
import { AssetManager } from "../AssetManager";
import { buildIsoTileBlockFaces } from "../../utils/IsoBlockGeometry";
import { darken } from "../../utils/Color";
import { hashAssetIdToColor } from "../../utils/AssetPlaceholderColor";
import { loadUnits, type UnitEntity } from "../../entities/UnitEntity";
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

const HOVER_COLOR = 0xffe14d;
const SELECTED_COLOR = 0xff4dd8;

/** Placeholder unit-token look (DEC-002) — no approved character art yet (ASSET_PIPELINE.md §5). */
const UNIT_TOKEN_RADIUS_PX = 10;
const UNIT_STAND_LIFT_PX = 6;
const TEAM_BORDER_COLORS: Record<UnitEntity["team"], number> = {
  hero: 0x4da6ff,
  enemy: 0xff4d4d,
};

/**
 * TASK-M1-02/M1-03/M1-04: renders the 10x10 grid (GridManager) in isometric
 * projection (IsoMath) with visibly distinct elevation tiers, a mouse
 * /keyboard/touch tile cursor (InputHandler) with a hover highlight, and the
 * hero/enemy units (UnitEntity) resolved through the AssetManager by asset
 * ID. Tile/terrain/unit data comes from data/ (DEC-002); no approved art
 * exists yet, so every tile and unit is an obvious placeholder, not final art.
 */
export class BattleScene extends Phaser.Scene {
  private fixedStep = new FixedTimestep(FIXED_STEP_MS, MAX_FIXED_STEPS_PER_FRAME);
  private simTicks = 0;
  private readonly isoMath = new IsoMath(TILE_WIDTH_PX, TILE_HEIGHT_PX);
  private grid!: GridManager;
  private units: UnitEntity[] = [];
  private hoverGraphics!: Phaser.GameObjects.Graphics;
  private selectedGraphics!: Phaser.GameObjects.Graphics;
  private readonly handleTileHover = (point: GridCoordinates): void => {
    this.drawTileOutline(this.hoverGraphics, point, HOVER_COLOR);
  };
  private readonly handleTileSelected = (point: GridCoordinates): void => {
    console.info(`[BattleScene] tile selected: (${point.x},${point.y})`);
    this.drawTileOutline(this.selectedGraphics, point, SELECTED_COLOR);
  };

  constructor() {
    super(SCENE_KEYS.BATTLE);
  }

  preload(): void {
    this.units = loadUnits();
    for (const unit of this.units) {
      const url = AssetManager.resolveCharacterAssetUrl(unit.assetId);
      if (url) this.load.image(unit.assetId, url);
    }
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

    this.grid = GridManager.fromLayout();
    this.renderGrid(this.grid);

    for (const unit of this.units) this.renderUnit(unit);

    this.selectedGraphics = this.add.graphics();
    this.hoverGraphics = this.add.graphics();

    new InputHandler(this, this.grid, this.isoMath, GRID_ORIGIN_X, GRID_ORIGIN_Y);

    EventBus.onTyped("tileHover", this.handleTileHover);
    EventBus.onTyped("tileSelected", this.handleTileSelected);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventBus.off("tileHover", this.handleTileHover);
      EventBus.off("tileSelected", this.handleTileSelected);
    });
  }

  private drawTileOutline(
    graphics: Phaser.GameObjects.Graphics,
    point: GridCoordinates,
    color: number,
  ): void {
    const tile = this.grid.getTile(point.x, point.y);
    if (!tile) return;
    const world = this.isoMath.gridToWorld(tile);
    const groundCenter = { x: GRID_ORIGIN_X + world.x, y: GRID_ORIGIN_Y + world.y };
    const elevationOffsetPx = this.isoMath.elevationOffsetPx(tile.elevation, ELEVATION_STEP_PX);
    const faces = buildIsoTileBlockFaces(
      groundCenter,
      elevationOffsetPx,
      TILE_WIDTH_PX,
      TILE_HEIGHT_PX,
    );

    graphics.clear();
    graphics.lineStyle(3, color, 1);
    graphics.strokePoints(toPoints(faces.top), true);
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

  /**
   * TASK-M1-04: resolves the unit's sprite by asset ID (AssetManager); if no
   * approved asset exists, falls back to an obvious procedural placeholder
   * token rather than crashing (CODING_RULES.md §5, DEC-002).
   */
  private renderUnit(unit: UnitEntity): void {
    const tile = this.grid.getTile(unit.x, unit.y);
    if (!tile) {
      console.warn(
        `[BattleScene] unit "${unit.id}" is placed on (${unit.x},${unit.y}), outside the grid`,
      );
      return;
    }

    const world = this.isoMath.gridToWorld(tile);
    const groundCenter = { x: GRID_ORIGIN_X + world.x, y: GRID_ORIGIN_Y + world.y };
    const elevationOffsetPx = this.isoMath.elevationOffsetPx(tile.elevation, ELEVATION_STEP_PX);
    const anchor = {
      x: groundCenter.x,
      y: groundCenter.y + elevationOffsetPx - UNIT_STAND_LIFT_PX,
    };

    if (this.textures.exists(unit.assetId)) {
      this.add.image(anchor.x, anchor.y, unit.assetId).setOrigin(0.5, 1);
      return;
    }

    console.warn(
      `[BattleScene] no approved asset for "${unit.assetId}" (unit "${unit.id}") — rendering a placeholder`,
    );
    const token = this.add.circle(
      anchor.x,
      anchor.y,
      UNIT_TOKEN_RADIUS_PX,
      hashAssetIdToColor(unit.assetId),
      1,
    );
    token.setStrokeStyle(2, TEAM_BORDER_COLORS[unit.team], 1);

    this.add
      .text(anchor.x, anchor.y - UNIT_TOKEN_RADIUS_PX - 4, `[PLACEHOLDER ${unit.assetId}]`, {
        fontFamily: "monospace",
        fontSize: "10px",
        color: "#e8e8e8",
      })
      .setOrigin(0.5, 1);
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
