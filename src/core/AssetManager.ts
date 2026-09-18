/**
 * Resolves character sprite assets by ID (CODING_RULES.md §5) — code never
 * hard-codes a path, only an asset ID. If the approved file isn't present
 * (DEC-002), `resolveCharacterAssetUrl` returns `undefined` and the caller
 * falls back to a procedural placeholder; this never throws for a missing
 * asset, and no code change is needed once the real file lands in
 * `/assets/approved/characters/`.
 *
 * Vite resolves this glob against the real filesystem at build/dev time, so
 * the manifest always reflects whatever asset files actually exist right
 * now — deleting a file removes it from the manifest with the next rebuild.
 */
const CHARACTER_ASSET_DIR = "/assets/approved/characters";

const characterAssetUrls = import.meta.glob("/assets/approved/characters/*.{png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

export class AssetManager {
  static resolveCharacterAssetUrl(assetId: string): string | undefined {
    return (
      characterAssetUrls[`${CHARACTER_ASSET_DIR}/${assetId}.webp`] ??
      characterAssetUrls[`${CHARACTER_ASSET_DIR}/${assetId}.png`]
    );
  }
}
