import { EventDispatcher } from 'three';
import { World } from '@/World';
import { sizes } from '@/data/sizes';
import { WCamera } from '@/base/WCamera';
import { WRenderer } from '@/base/WRenderer';

export class WResizer extends EventDispatcher {
  container: Element;
  camera: WCamera;
  renderer: WRenderer;

  constructor(world: World) {
    super();
    this.container = world.container;
    this.camera = world.camera;
    this.renderer = world.renderer;

    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.camera.instance.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.instance.updateProjectionMatrix();
    this.renderer.instance.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.instance.setPixelRatio(sizes.pixelRatio);
    this.dispatchEvent({ type: 'sizes_updated' });
  }
}
