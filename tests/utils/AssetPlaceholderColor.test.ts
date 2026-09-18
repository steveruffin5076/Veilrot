import { describe, expect, it } from "vitest";
import { hashAssetIdToColor } from "../../src/utils/AssetPlaceholderColor";

describe("hashAssetIdToColor", () => {
  it("is deterministic for the same asset ID", () => {
    expect(hashAssetIdToColor("hero_squire_idle")).toBe(hashAssetIdToColor("hero_squire_idle"));
  });

  it("produces different colours for different asset IDs", () => {
    expect(hashAssetIdToColor("hero_squire_idle")).not.toBe(
      hashAssetIdToColor("enemy_goblin_idle"),
    );
  });

  it("always returns a value within the 0x000000-0xFFFFFF range", () => {
    for (const id of ["a", "hero_squire_idle", "enemy_goblin_idle", ""]) {
      const color = hashAssetIdToColor(id);
      expect(color).toBeGreaterThanOrEqual(0);
      expect(color).toBeLessThanOrEqual(0xffffff);
    }
  });
});
