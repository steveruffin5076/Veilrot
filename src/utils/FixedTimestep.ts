/**
 * Fixed-timestep accumulator (TASK-M1-01, ARCHITECTURE.md §7 — 60 FPS simulation).
 * Pure and headless-testable (CODING_RULES.md §3, §6).
 *
 * Caps steps-per-frame so a long/backgrounded frame cannot spiral into unbounded
 * catch-up work or a teleporting simulation (CODING_RULES.md §7 / DEC-004).
 */
export class FixedTimestep {
  private accumulatorMs = 0;

  constructor(
    private readonly stepMs: number,
    private readonly maxStepsPerFrame: number,
  ) {
    if (stepMs <= 0) throw new Error("stepMs must be > 0");
    if (maxStepsPerFrame <= 0) throw new Error("maxStepsPerFrame must be > 0");
  }

  /**
   * Advances the accumulator by `deltaMs` and invokes `step` once per fixed step
   * that has elapsed, up to `maxStepsPerFrame`. Returns the number of steps run.
   */
  advance(deltaMs: number, step: (stepMs: number) => void): number {
    const clampedDelta = Math.max(0, deltaMs);
    this.accumulatorMs += clampedDelta;

    let stepsRun = 0;
    while (this.accumulatorMs >= this.stepMs && stepsRun < this.maxStepsPerFrame) {
      step(this.stepMs);
      this.accumulatorMs -= this.stepMs;
      stepsRun += 1;
    }

    // Drop any remaining backlog once the cap is hit rather than let it compound
    // across future frames (the "teleport after tab-hide" bug — DEC-004).
    if (stepsRun === this.maxStepsPerFrame) {
      this.accumulatorMs = 0;
    }

    return stepsRun;
  }

  get pendingMs(): number {
    return this.accumulatorMs;
  }
}
