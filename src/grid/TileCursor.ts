export interface CursorPosition {
  x: number;
  y: number;
}

/**
 * Pure cursor-position state for the tile cursor (TASK-M1-03). Clamps all
 * movement to the grid bounds. No rendering, no input handling — those live
 * in InputHandler / the Scene that renders the highlight (CODING_RULES.md §3
 * state separation).
 */
export class TileCursor {
  private position: CursorPosition;

  constructor(
    private readonly gridWidth: number,
    private readonly gridHeight: number,
    initial: CursorPosition = { x: 0, y: 0 },
  ) {
    this.position = this.clamp(initial);
  }

  get current(): CursorPosition {
    return { ...this.position };
  }

  /** Moves by a delta, clamped to the grid bounds. Returns true if the position changed. */
  moveBy(dx: number, dy: number): boolean {
    return this.moveTo({ x: this.position.x + dx, y: this.position.y + dy });
  }

  /** Moves to an absolute position, clamped to the grid bounds. Returns true if the position changed. */
  moveTo(target: CursorPosition): boolean {
    const clamped = this.clamp(target);
    if (clamped.x === this.position.x && clamped.y === this.position.y) return false;
    this.position = clamped;
    return true;
  }

  private clamp(point: CursorPosition): CursorPosition {
    return {
      x: Math.min(Math.max(point.x, 0), this.gridWidth - 1),
      y: Math.min(Math.max(point.y, 0), this.gridHeight - 1),
    };
  }
}
