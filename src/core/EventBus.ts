import Phaser from "phaser";

/**
 * Global, strongly-typed event bus (ARCHITECTURE.md §2/§3.3).
 * UI and systems communicate through this — never by reading each other's state directly
 * (CODING_RULES.md §3).
 */
export interface EventBusEvents {
  sceneTransition: { from: string | null; to: string };
  audioUnlocked: void;
}

class TypedEventBus extends Phaser.Events.EventEmitter {
  emitTyped<K extends keyof EventBusEvents>(
    event: K,
    ...args: EventBusEvents[K] extends void ? [] : [EventBusEvents[K]]
  ): boolean {
    return this.emit(event as string, ...args);
  }

  onTyped<K extends keyof EventBusEvents>(
    event: K,
    fn: (payload: EventBusEvents[K]) => void,
  ): this {
    return this.on(event as string, fn as (...args: unknown[]) => void);
  }
}

export const EventBus = new TypedEventBus();
