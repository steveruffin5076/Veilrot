/**
 * Deterministic placeholder colour derived from a hash of the asset ID
 * (ASSET_PIPELINE.md §3.3, point 3). Pure — same ID always yields the same
 * colour, so a placeholder never flickers between renders/reloads.
 */
export function hashAssetIdToColor(assetId: string): number {
  // FNV-1a, cheap and well-distributed enough for a placeholder palette.
  let hash = 2166136261;
  for (let i = 0; i < assetId.length; i++) {
    hash ^= assetId.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  // Keep channels mid-range so the placeholder reads clearly against both
  // dark backgrounds and the light-ish placeholder tile colours.
  const channel = (shift: number): number => 80 + (((hash >>> shift) & 0xff) % 150);
  return (channel(0) << 16) | (channel(8) << 8) | channel(16);
}
