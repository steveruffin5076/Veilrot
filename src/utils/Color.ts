/** Darkens a 0xRRGGBB colour by `factor` (0-1). Used to shade placeholder iso-block side faces. */
export function darken(color: number, factor: number): number {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  const scale = (channel: number): number =>
    Math.max(0, Math.min(255, Math.round(channel * factor)));
  return (scale(r) << 16) | (scale(g) << 8) | scale(b);
}
