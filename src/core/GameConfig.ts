/** Internal render resolution (ARCHITECTURE.md §1.3, template's example — D-27 to confirm). */
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

/** Fixed simulation step (ARCHITECTURE.md §7 — 60 FPS, NFR-01). */
export const FIXED_STEP_MS = 1000 / 60;

/** Caps the spiral-of-death after a long/backgrounded frame (CODING_RULES.md §7). */
export const MAX_FIXED_STEPS_PER_FRAME = 5;

export const SCENE_KEYS = {
  TITLE: "TitleScene",
  BATTLE: "BattleScene",
} as const;
