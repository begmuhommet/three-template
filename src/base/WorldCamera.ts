import { EventDispatcher, PerspectiveCamera, Scene } from 'three';
import { World } from '@/World';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WorldRenderer } from '@/base/WorldRenderer';
import { WorldResizer } from '@/base/WorldResizer';

export class WorldCamera extends EventDispatcher {
  instance: PerspectiveCamera;
  controls: OrbitControls | null = null;
  renderer: WorldRenderer;
  scene: Scene;
  resizer: WorldResizer;
  container: Element;

  constructor(world: World) {
    super();
    this.renderer = world.renderer;
    this.scene = world.scene;
    this.resizer = world.resizer;
    this.container = world.container;

    this.instance = new PerspectiveCamera(75, world.container.clientWidth / world.container.clientHeight, 0.1, 1000);
    this.instance.position.set(0, 0, 10);
    this.scene.add(this.instance);
    this.enableControls();
  }

  enableControls() {
    this.controls = new OrbitControls(this.instance, this.renderer.instance.domElement);
    this.controls.enableDamping = true;
    this.renderer.addUpdateObjects(this);
  }

  tick() {
    this.controls?.update();
  }
}
