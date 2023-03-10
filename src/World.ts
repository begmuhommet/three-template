import { AxesHelper, EventDispatcher, Scene } from 'three';
import { WLights } from '@/base/WLights';
import { WResizer } from '@/base/WResizer';
import { WTime } from '@/base/WTime';
import { WCamera } from '@/base/WCamera';
import { WDebugPane } from '@/base/WDebugPane';
import { WRenderer } from '@/base/WRenderer';
import WStats from '@/base/WStats';
import { WLoader } from '@/base/WLoader';
import { ResourceNames, resources } from '@/data/resources';
import { Helmet } from '@/components/Environment/Helmet';
import { CustomEvents } from '@/data/customEvents';

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
  stats: WStats;
  loader: WLoader;

  helmet: Helmet;

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
    this.stats = new WStats(this);
    this.loader = new WLoader(this, resources);

    this.helmet = new Helmet(this);

    this.init();
    // this.enableAxesHelper();
  }

  async init() {
    this.container.appendChild(this.renderer.instance.domElement);
    this.loader.addEventListener(CustomEvents.ResourceLoaded, () => this.setEnvironmentMap());
  }

  setEnvironmentMap() {
    this.scene.background = this.loader.items[ResourceNames.CubeTexture];
    this.scene.environment = this.loader.items[ResourceNames.CubeTexture];
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
