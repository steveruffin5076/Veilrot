import { describe, expect, it } from "vitest";
import { AssetManager } from "../../src/core/AssetManager";

describe("AssetManager", () => {
  it("resolves undefined (never throws) for an asset ID with no approved file", () => {
    // TASK-M1-04 acceptance criterion: no approved character art exists yet
    // (ASSET_PIPELINE.md §5), so every asset ID must resolve to undefined —
    // the caller falls back to a placeholder instead of crashing.
    expect(AssetManager.resolveCharacterAssetUrl("hero_squire_idle")).toBeUndefined();
    expect(AssetManager.resolveCharacterAssetUrl("enemy_goblin_idle")).toBeUndefined();
    expect(AssetManager.resolveCharacterAssetUrl("does_not_exist_at_all")).toBeUndefined();
  });
});
