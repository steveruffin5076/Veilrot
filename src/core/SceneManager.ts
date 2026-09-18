import { EventBus } from "./EventBus";

/**
 * Central scene-transition tracker (ARCHITECTURE.md §2).
 * Scenes call `SceneManager.notifyEnter(this.scene.key)` from their own `create()`.
 * Nothing needs to read Phaser's internal scene-manager state directly
 * (CODING_RULES.md §3) — everything downstream subscribes to the EventBus instead.
 */
class SceneManagerController {
  private currentSceneKey: string | null = null;

  notifyEnter(sceneKey: string): void {
    const from = this.currentSceneKey;
    this.currentSceneKey = sceneKey;
    console.info(`[SceneManager] transition: ${from ?? "(boot)"} -> ${sceneKey}`);
    EventBus.emitTyped("sceneTransition", { from, to: sceneKey });
  }

  get activeSceneKey(): string | null {
    return this.currentSceneKey;
  }
}

export const SceneManager = new SceneManagerController();
