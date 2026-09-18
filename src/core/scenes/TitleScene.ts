import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT, SCENE_KEYS } from "../GameConfig";
import { SceneManager } from "../SceneManager";
import { AudioUnlockGate } from "../../platform/AudioUnlockGate";

/**
 * TASK-M1-01. No approved title-screen art exists yet (DEC-002) — the background
 * is an obvious flat-colour placeholder labelled with its asset ID so it can never
 * be mistaken for final art (CODING_RULES.md §5).
 */
export class TitleScene extends Phaser.Scene {
  private audioGate!: AudioUnlockGate;

  constructor() {
    super(SCENE_KEYS.TITLE);
  }

  create(): void {
    SceneManager.notifyEnter(this.scene.key);
    this.audioGate = new AudioUnlockGate(this.sound);

    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x1b2430).setOrigin(0, 0);
    this.add
      .text(12, 12, "[PLACEHOLDER bg_title_001]", {
        fontFamily: "monospace",
        fontSize: "12px",
        color: "#5a6b7a",
      })
      .setOrigin(0, 0);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, "VEILROT", {
        fontFamily: "monospace",
        fontSize: "48px",
        color: "#e8e8e8",
      })
      .setOrigin(0.5);

    const prompt = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 40, "Click / Tap to Start", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#8fa0b0",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: { from: 1, to: 0.3 },
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.input.once(Phaser.Input.Events.POINTER_DOWN, this.handleStart, this);
    this.input.keyboard?.once(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.handleStart, this);
  }

  private handleStart(): void {
    this.audioGate.requestUnlock();
    this.scene.start(SCENE_KEYS.BATTLE);
  }
}
