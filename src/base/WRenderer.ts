import { CineonToneMapping, EventDispatcher, PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from 'three';
import { World } from '@/World';
import { CustomEvents } from '@/data/customEvents';

export class WRenderer extends EventDispatcher {
  instance: WebGLRenderer;
  world: World;

  constructor(world: World) {
    super();
    this.world = world;
    this.instance = new WebGLRenderer({ antialias: true });
    this.setConfig();
  }

  setConfig() {
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    this.instance.toneMapping = CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = PCFSoftShadowMap;
    // this.instance.setClearColor('#211d20');
  }

  start() {
    this.instance.setAnimationLoop(() => this.update());
  }

  stop() {
    this.instance.setAnimationLoop(null);
  }

  update() {
    this.instance.render(this.world.scene, this.world.camera.instance);
    this.dispatchEvent({ type: CustomEvents.Tick });
  }
}
