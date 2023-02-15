import { CineonToneMapping, EventDispatcher, PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from 'three';
import { World } from '@/World';

export class WRenderer extends EventDispatcher {
  instance: WebGLRenderer;
  world: World;

  updateObjects: any[] = [];

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
    this.instance.setClearColor('#211d20');
  }

  addUpdateObjects(obj: any) {
    this.updateObjects.push(obj);
  }

  start() {
    this.instance.setAnimationLoop((elapsedTime: number) => this.update(elapsedTime));
  }

  stop() {
    this.instance.setAnimationLoop(null);
  }

  update(elapsedTime: number) {
    this.instance.render(this.world.scene, this.world.camera.instance);
    this.updateObjects.forEach(obj => obj.tick(elapsedTime));
  }
}
