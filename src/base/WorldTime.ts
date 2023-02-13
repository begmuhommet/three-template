import { EventDispatcher } from 'three';
import { World } from '@/World';

export class WorldTime extends EventDispatcher {
  world: World;

  constructor(world: World) {
    super();
    this.world = world;
  }
}
