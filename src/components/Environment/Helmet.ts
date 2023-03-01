import { World } from '@/World';
import { CustomEvents } from '@/data/customEvents';
import { ResourceNames } from '@/data/resources';

export class Helmet {
  world: World;

  constructor(world: World) {
    this.world = world;
    this.world.loader.addEventListener(CustomEvents.ResourceLoaded, () => this.init());
  }

  init() {
    const helmet = this.world.loader.items[ResourceNames.HelmetModel];
    this.world.scene.add(helmet.scene);
    console.log(helmet);
  }
}
