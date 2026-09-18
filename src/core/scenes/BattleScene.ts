import Phaser from "phaser";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  FIXED_STEP_MS,
  MAX_FIXED_STEPS_PER_FRAME,
  SCENE_KEYS,
} from "../GameConfig";
import { SceneManager } from "../SceneManager";
import { FixedTimestep } from "../../utils/FixedTimestep";

/**
 * TASK-M1-01. Battle grid/units/combat arrive in later M1 task cards
 * (TASK-M1-02 onward) — this scene proves the scene transition, the audio
 * unlock, and the fixed-step simulation loop it will run on.
 */
export class BattleScene extends Phaser.Scene {
  private fixedStep = new FixedTimestep(FIXED_STEP_MS, MAX_FIXED_STEPS_PER_FRAME);
  private simTicks = 0;

  constructor() {
    super(SCENE_KEYS.BATTLE);
  }

  create(): void {
    SceneManager.notifyEnter(this.scene.key);

    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x24331f).setOrigin(0, 0);
    this.add
      .text(12, 12, "[PLACEHOLDER bg_battle_grid_001]", {
        fontFamily: "monospace",
        fontSize: "12px",
        color: "#5a7a5a",
      })
      .setOrigin(0, 0);
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "BATTLE SCENE (grid arrives in TASK-M1-02)", {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#d0e0d0",
      })
      .setOrigin(0.5);
  }

  override update(_time: number, delta: number): void {
    this.fixedStep.advance(delta, () => {
      this.simTicks += 1;
    });
  }

  /** Exposed for the debug overlay; not gameplay state, purely instrumentation. */
  get simulationTicks(): number {
    return this.simTicks;
  }
}
