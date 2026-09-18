/**
 * Pure vertex math for drawing a tile as a "height block" (a top diamond plus
 * two side faces down to ground level) so elevation tiers are visibly distinct
 * (TASK-M1-02). No Phaser dependency — kept headless-testable and separate
 * from the Scene that actually draws it (CODING_RULES.md §3).
 */
export interface Point {
  x: number;
  y: number;
}

export interface IsoBlockFaces {
  /** Flat [x0,y0,x1,y1,...] vertex lists, ready for Phaser's `Graphics.fillPoints`. */
  top: number[];
  left: number[];
  right: number[];
}

export function buildIsoTileBlockFaces(
  groundCenter: Point,
  elevationOffsetPx: number,
  tileWidthPx: number,
  tileHeightPx: number,
): IsoBlockFaces {
  const halfW = tileWidthPx / 2;
  const halfH = tileHeightPx / 2;
  const topCenter: Point = { x: groundCenter.x, y: groundCenter.y + elevationOffsetPx };

  const top: Point = { x: topCenter.x, y: topCenter.y - halfH };
  const right: Point = { x: topCenter.x + halfW, y: topCenter.y };
  const bottom: Point = { x: topCenter.x, y: topCenter.y + halfH };
  const left: Point = { x: topCenter.x - halfW, y: topCenter.y };

  const groundBottom: Point = { x: groundCenter.x, y: groundCenter.y + halfH };
  const groundLeft: Point = { x: groundCenter.x - halfW, y: groundCenter.y };
  const groundRight: Point = { x: groundCenter.x + halfW, y: groundCenter.y };

  return {
    top: [top.x, top.y, right.x, right.y, bottom.x, bottom.y, left.x, left.y],
    left: [
      left.x,
      left.y,
      bottom.x,
      bottom.y,
      groundBottom.x,
      groundBottom.y,
      groundLeft.x,
      groundLeft.y,
    ],
    right: [
      right.x,
      right.y,
      bottom.x,
      bottom.y,
      groundBottom.x,
      groundBottom.y,
      groundRight.x,
      groundRight.y,
    ],
  };
}
