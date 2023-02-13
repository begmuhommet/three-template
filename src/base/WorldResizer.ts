import { EventDispatcher, PerspectiveCamera } from 'three';
import { World } from '@/World';
import { sizes } from '@/data/sizes';
import { WorldCamera } from '@/base/WorldCamera';
import { WorldRenderer } from '@/base/WorldRenderer';

export class WorldResizer extends EventDispatcher {
  container: Element;
  camera: WorldCamera;
  renderer: WorldRenderer;

  constructor(world: World) {
    super();
    this.container = world.container;
    this.camera = world.camera;
    this.renderer = world.renderer;

    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (this.camera.instance instanceof PerspectiveCamera) {
      this.camera.instance.aspect = this.container.clientWidth / this.container.clientHeight;
    }

    this.camera.instance.updateProjectionMatrix();
    this.renderer.instance.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.instance.setPixelRatio(sizes.pixelRatio);
    this.dispatchEvent({ type: 'sizes_updated' });
  }
}
