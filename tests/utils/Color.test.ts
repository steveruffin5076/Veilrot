import { describe, expect, it } from "vitest";
import { darken } from "../../src/utils/Color";

describe("darken", () => {
  it("leaves a colour unchanged at factor 1", () => {
    expect(darken(0x3f6b35, 1)).toBe(0x3f6b35);
  });

  it("scales every channel by the given factor", () => {
    expect(darken(0xffffff, 0.5)).toBe(0x808080);
  });

  it("clamps at black for a zero factor", () => {
    expect(darken(0xffffff, 0)).toBe(0x000000);
  });
});
