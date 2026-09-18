import { describe, expect, it } from "vitest";
import { FixedTimestep } from "../../src/utils/FixedTimestep";

describe("FixedTimestep", () => {
  it("runs exactly one step for a delta equal to the step size", () => {
    const timestep = new FixedTimestep(16, 5);
    let ticks = 0;
    const stepsRun = timestep.advance(16, () => {
      ticks += 1;
    });
    expect(stepsRun).toBe(1);
    expect(ticks).toBe(1);
  });

  it("accumulates a partial delta across calls instead of dropping it", () => {
    const timestep = new FixedTimestep(16, 5);
    let ticks = 0;
    timestep.advance(10, () => {
      ticks += 1;
    });
    expect(ticks).toBe(0);
    timestep.advance(10, () => {
      ticks += 1;
    });
    expect(ticks).toBe(1);
  });

  it("caps steps-per-frame and discards backlog beyond the cap (tab-hide teleport bug)", () => {
    const timestep = new FixedTimestep(16, 5);
    let ticks = 0;
    const stepsRun = timestep.advance(1000, () => {
      ticks += 1;
    });
    expect(stepsRun).toBe(5);
    expect(ticks).toBe(5);
    expect(timestep.pendingMs).toBe(0);
  });

  it("never runs a step for a zero or negative delta", () => {
    const timestep = new FixedTimestep(16, 5);
    let ticks = 0;
    expect(
      timestep.advance(-50, () => {
        ticks += 1;
      }),
    ).toBe(0);
    expect(ticks).toBe(0);
  });

  it("throws on a non-positive step size or step cap", () => {
    expect(() => new FixedTimestep(0, 5)).toThrow();
    expect(() => new FixedTimestep(16, 0)).toThrow();
  });
});
