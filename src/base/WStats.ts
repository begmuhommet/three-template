import { World } from '@/World';
import { CustomEvents } from '@/data/customEvents';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class WStats {
  world: World;
  instance: Stats;

  constructor(world: World) {
    this.world = world;

    this.instance = Stats();
    document.body.appendChild(this.instance.dom);

    this.world.renderer.addEventListener(CustomEvents.Tick, () => this.tick());
  }

  tick() {
    this.instance.update();
  }
}
