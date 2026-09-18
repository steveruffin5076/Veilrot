import Phaser from "phaser";
import { EventBus } from "../core/EventBus";

/**
 * Browsers block audio playback until a user gesture (ARCHITECTURE.md §5.1, DEC-004).
 * This gate isolates that behaviour so gameplay code never touches the audio
 * context directly (CODING_RULES.md §3) and audio never fails silently.
 */
export class AudioUnlockGate {
  private unlocked = false;

  constructor(private readonly sound: Phaser.Sound.BaseSoundManager) {
    if (this.sound.locked) {
      this.sound.once(Phaser.Sound.Events.UNLOCKED, this.handleUnlocked, this);
    } else {
      // Some browsers/contexts never lock (e.g. already-interacted reloads).
      this.unlocked = true;
    }
  }

  private handleUnlocked = (): void => {
    this.unlocked = true;
    EventBus.emitTyped("audioUnlocked");
  };

  isUnlocked(): boolean {
    return this.unlocked;
  }

  /** Call from a user-gesture handler (pointerdown/keydown) to force-resume the context. */
  requestUnlock(): void {
    if (this.unlocked) return;
    const context = (this.sound as unknown as { context?: AudioContext }).context;
    if (context && context.state === "suspended") {
      void context.resume().catch((err: unknown) => {
        console.error("[AudioUnlockGate] failed to resume audio context", err);
      });
    }
  }
}
