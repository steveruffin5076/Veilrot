import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT } from "./GameConfig";
import { TitleScene } from "./scenes/TitleScene";
import { BattleScene } from "./scenes/BattleScene";
import { DebugOverlay } from "./DebugOverlay";

const root = document.getElementById("game-root");
if (!root) {
  throw new Error("[main] #game-root element missing from index.html");
}

// DEC-004 requires capping device-pixel-ratio on mobile so the renderer never pays
// a silent perf tax for a 3-4x-DPR screen. Phaser 4's ScaleManager already renders
// at a fixed backing resolution (`width`/`height` below) and only CSS-scales the
// canvas for display (see node_modules/phaser/skills/scale-and-responsive) — unlike
// Phaser 3, there is no `resolution` multiplier to set, so this requirement is
// satisfied by construction rather than by an explicit cap value.
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: root,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#0a0a0f",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  fps: {
    target: 60,
  },
  scene: [TitleScene, BattleScene],
};

const game = new Phaser.Game(config);

// DEV-only by default; toggled at runtime with the backtick key (ARCHITECTURE.md §6).
const debugOverlay = new DebugOverlay(document.body, import.meta.env.DEV);
window.addEventListener("keydown", (event) => {
  if (event.key === "`") debugOverlay.toggle();
});

game.events.on(Phaser.Core.Events.POST_STEP, () => {
  const activeScene = game.scene.getScenes(true)[0];
  debugOverlay.update(game.loop.actualFps, game.loop.delta, activeScene?.scene.key ?? "(none)");
});

// DEC-004: the page can be hidden/suspended at any moment — pause the simulation
// rather than let it accumulate a huge delta that "teleports" units on return.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    game.loop.sleep();
  } else {
    game.loop.wake();
  }
});

if (import.meta.env.DEV) {
  console.info(`[Veilrot] v${__APP_VERSION__} built ${__BUILD_TIME__}`);
}
