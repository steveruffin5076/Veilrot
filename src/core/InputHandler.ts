import Phaser from "phaser";
import { GridManager } from "../grid/GridManager";
import { IsoMath } from "../grid/IsoMath";
import { TileCursor, type CursorPosition } from "../grid/TileCursor";
import { EventBus } from "./EventBus";

const KEY_DELTAS: Record<string, { dx: number; dy: number }> = {
  w: { dx: 0, dy: -1 },
  arrowup: { dx: 0, dy: -1 },
  s: { dx: 0, dy: 1 },
  arrowdown: { dx: 0, dy: 1 },
  a: { dx: -1, dy: 0 },
  arrowleft: { dx: -1, dy: 0 },
  d: { dx: 1, dy: 0 },
  arrowright: { dx: 1, dy: 0 },
};

/**
 * Wires mouse, touch and keyboard input to a `TileCursor` over the battle
 * grid (TASK-M1-03). Emits `tileHover` on every cursor move and
 * `tileSelected` on confirm (click, tap, or Enter/Space) — a Scene renders
 * the highlight by subscribing to those events, never by reading this class
 * directly (CODING_RULES.md §3). Keyboard and touch each work fully on
 * their own — nothing here depends on a prior mouse hover.
 *
 * Picking uses `IsoMath` on the ground plane (elevation is a render-only
 * offset there by design) — a tall tile's raised top face can therefore
 * pick the tile behind it near its edges. Acceptable for this milestone;
 * worth a follow-up if pixel-perfect picking against elevation is needed.
 */
export class InputHandler {
  private readonly cursor: TileCursor;
  private readonly handlePointerMove = (pointer: Phaser.Input.Pointer): void => {
    const point = this.resolvePointerTile(pointer);
    if (point && this.cursor.moveTo(point)) this.emitHover();
  };
  private readonly handlePointerDown = (pointer: Phaser.Input.Pointer): void => {
    const point = this.resolvePointerTile(pointer);
    if (!point) return;
    if (this.cursor.moveTo(point)) this.emitHover();
    this.emitSelected();
  };
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    const delta = KEY_DELTAS[event.key.toLowerCase()];
    if (delta) {
      event.preventDefault();
      if (this.cursor.moveBy(delta.dx, delta.dy)) this.emitHover();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.emitSelected();
    }
  };

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly grid: GridManager,
    private readonly isoMath: IsoMath,
    private readonly originX: number,
    private readonly originY: number,
  ) {
    this.cursor = new TileCursor(grid.width, grid.height);

    scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove);
    scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown);

    if (scene.input.keyboard) {
      scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.handleKeyDown);
    } else {
      console.warn(
        "[InputHandler] no keyboard plugin on this scene — keyboard navigation disabled",
      );
    }

    // Announce the starting position so a highlight is visible before any input.
    this.emitHover();

    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
  }

  get cursorPosition(): CursorPosition {
    return this.cursor.current;
  }

  private resolvePointerTile(pointer: Phaser.Input.Pointer): CursorPosition | undefined {
    const gridPoint = this.isoMath.worldToGrid({
      x: pointer.worldX - this.originX,
      y: pointer.worldY - this.originY,
    });
    const x = Math.round(gridPoint.x);
    const y = Math.round(gridPoint.y);
    return this.grid.getTile(x, y) ? { x, y } : undefined;
  }

  private emitHover(): void {
    EventBus.emitTyped("tileHover", this.cursor.current);
  }

  private emitSelected(): void {
    EventBus.emitTyped("tileSelected", this.cursor.current);
  }

  destroy(): void {
    this.scene.input.off(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove);
    this.scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown);
    this.scene.input.keyboard?.off(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.handleKeyDown);
  }
}
