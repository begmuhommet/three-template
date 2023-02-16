import { EventDispatcher } from 'three';
import { World } from '@/World';
import { CustomEvents } from '@/data/customEvents';

export class WTime extends EventDispatcher {
  world: World;

  start: number;
  current: number;
  elapsed: number;
  delta: number;

  constructor(world: World) {
    super();
    this.world = world;

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.world.renderer.addEventListener(CustomEvents.Tick, () => this.tick());
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
  }
}
