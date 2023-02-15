import { AxesHelper, EventDispatcher, Scene } from 'three';
import { WLights } from '@/base/WLights';
import { WResizer } from '@/base/WResizer';
import { WTime } from '@/base/WTime';
import { WCamera } from '@/base/WCamera';
import { WDebugPane } from '@/base/WDebugPane';
import { WRenderer } from '@/base/WRenderer';

export class World extends EventDispatcher {
  loading = false;
  active = false;

  container: Element;
  renderer: WRenderer;
  scene: Scene;
  lights: WLights;
  resizer: WResizer;
  time: WTime;
  camera: WCamera;
  debugPane: WDebugPane;

  constructor(container: Element) {
    super();

    this.container = container;
    this.scene = new Scene();
    this.renderer = new WRenderer(this);
    this.camera = new WCamera(this);
    this.time = new WTime(this);
    this.debugPane = new WDebugPane(this);
    this.lights = new WLights(this);
    this.resizer = new WResizer(this);

    this.init();
    this.enableAxesHelper();
  }

  async init() {
    this.container.appendChild(this.renderer.instance.domElement);
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  enableAxesHelper() {
    const axesHelper = new AxesHelper(3);
    this.scene.add(axesHelper);
  }

  setActive(value: boolean) {
    this.active = value;
  }

  start() {
    this.renderer.start();
    this.setActive(true);
  }

  stop() {
    this.renderer.stop();
    this.setActive(false);
  }
}
