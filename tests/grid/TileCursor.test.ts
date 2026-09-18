import { describe, expect, it } from "vitest";
import { TileCursor } from "../../src/grid/TileCursor";

describe("TileCursor", () => {
  it("starts at the given initial position, clamped to the grid", () => {
    const cursor = new TileCursor(10, 10, { x: 3, y: 4 });
    expect(cursor.current).toEqual({ x: 3, y: 4 });
  });

  it("defaults to (0,0) with no initial position", () => {
    expect(new TileCursor(10, 10).current).toEqual({ x: 0, y: 0 });
  });

  it("moves by a delta and reports the change", () => {
    const cursor = new TileCursor(10, 10, { x: 5, y: 5 });
    expect(cursor.moveBy(1, 0)).toBe(true);
    expect(cursor.current).toEqual({ x: 6, y: 5 });
    expect(cursor.moveBy(0, -2)).toBe(true);
    expect(cursor.current).toEqual({ x: 6, y: 3 });
  });

  it("clamps movement at the grid edges instead of leaving the grid", () => {
    const cursor = new TileCursor(10, 10, { x: 0, y: 0 });
    expect(cursor.moveBy(-1, -1)).toBe(false);
    expect(cursor.current).toEqual({ x: 0, y: 0 });

    const cursorAtMax = new TileCursor(10, 10, { x: 9, y: 9 });
    expect(cursorAtMax.moveBy(1, 1)).toBe(false);
    expect(cursorAtMax.current).toEqual({ x: 9, y: 9 });
  });

  it("moveTo clamps out-of-bounds targets and reports whether the position changed", () => {
    const cursor = new TileCursor(10, 10, { x: 5, y: 5 });
    expect(cursor.moveTo({ x: 20, y: -5 })).toBe(true);
    expect(cursor.current).toEqual({ x: 9, y: 0 });
    expect(cursor.moveTo({ x: 9, y: 0 })).toBe(false);
  });

  it("current returns a copy, not a live reference", () => {
    const cursor = new TileCursor(10, 10, { x: 1, y: 1 });
    const snapshot = cursor.current;
    cursor.moveBy(1, 1);
    expect(snapshot).toEqual({ x: 1, y: 1 });
  });
});
