import { describe, expect, it } from "vitest";
import { buildIsoTileBlockFaces } from "../../src/utils/IsoBlockGeometry";

describe("buildIsoTileBlockFaces", () => {
  it("builds a standard diamond for the top face at ground level (elevation 0)", () => {
    const faces = buildIsoTileBlockFaces({ x: 100, y: 100 }, 0, 64, 32);
    expect(faces.top).toEqual([
      100,
      84, // top vertex (y - halfH)
      132,
      100, // right vertex (x + halfW)
      100,
      116, // bottom vertex (y + halfH)
      68,
      100, // left vertex (x - halfW)
    ]);
  });

  it("shifts the top face up by the elevation offset and connects side faces to ground level", () => {
    const faces = buildIsoTileBlockFaces({ x: 100, y: 100 }, -32, 64, 32);

    // Top face is raised: its bottom vertex sits at groundY - 32 + halfH = 84.
    expect(faces.top.slice(4, 6)).toEqual([100, 84]);

    // Left face connects the raised left vertex down to the ground-level left vertex.
    expect(faces.left).toEqual([
      68,
      68, // raised left vertex
      100,
      84, // raised bottom vertex
      100,
      116, // ground bottom vertex
      68,
      100, // ground left vertex
    ]);
  });
});
