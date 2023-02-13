import { AxesHelper, EventDispatcher, Scene } from 'three';
import { WorldLights } from '@/base/WorldLights';
import { WorldResizer } from '@/base/WorldResizer';
import { WorldTime } from '@/base/WorldTime';
import { WorldRenderer } from '@/base/WorldRenderer';
import { WorldCamera } from '@/base/WorldCamera';
import { Cube } from '@/components/Environment/Cube';
import { DebugPane } from '@/base/DebugPane';

export class World extends EventDispatcher {
  loading = false;
  active = false;

  container: Element;
  renderer: WorldRenderer;
  scene: Scene;
  lights: WorldLights;
  resizer: WorldResizer;
  time: WorldTime;
  camera: WorldCamera;
  debugPane: DebugPane;

  cube: Cube;

  constructor(container: Element) {
    super();

    this.container = container;
    this.scene = new Scene();
    this.renderer = new WorldRenderer(this);
    this.camera = new WorldCamera(this);
    this.debugPane = new DebugPane(this);
    this.cube = new Cube(this);
    this.lights = new WorldLights(this);
    this.resizer = new WorldResizer(this);
    this.time = new WorldTime(this);

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
