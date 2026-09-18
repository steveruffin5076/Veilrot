/**
 * Debug overlay: fps, frame time, build version (ARCHITECTURE.md §6, NFR-22).
 * DOM-based so it survives canvas resizes/scaling untouched. Toggled by one flag
 * and hidden by default in production builds.
 */
export class DebugOverlay {
  private readonly el: HTMLDivElement;
  private visible: boolean;

  constructor(root: HTMLElement, initiallyVisible: boolean) {
    this.el = document.createElement("div");
    this.el.id = "debug-overlay";
    this.el.style.cssText = [
      "position:fixed",
      "top:calc(env(safe-area-inset-top, 0px) + 4px)",
      "left:calc(env(safe-area-inset-left, 0px) + 4px)",
      "padding:4px 8px",
      "font:11px/1.4 monospace",
      "color:#8fffb0",
      "background:rgba(0,0,0,0.55)",
      "border-radius:4px",
      "pointer-events:none",
      "white-space:pre",
      "z-index:1000",
    ].join(";");
    root.appendChild(this.el);

    this.visible = initiallyVisible;
    this.render();
  }

  toggle(): void {
    this.visible = !this.visible;
    this.render();
  }

  update(fps: number, frameTimeMs: number, sceneName: string, gridCoords?: string): void {
    if (!this.visible) return;
    const lines = [
      `Veilrot v${__APP_VERSION__} (${__BUILD_TIME__})`,
      `scene: ${sceneName}`,
      `fps: ${fps.toFixed(0)}  frame: ${frameTimeMs.toFixed(2)}ms`,
    ];
    if (gridCoords) lines.push(`grid: ${gridCoords}`);
    this.el.textContent = lines.join("\n");
  }

  private render(): void {
    this.el.style.display = this.visible ? "block" : "none";
  }
}
