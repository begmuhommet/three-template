import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  EventDispatcher,
  PointLight,
  PointLightHelper,
  Scene,
} from 'three';
import { World } from '@/World';
import { WDebugPane } from '@/base/WDebugPane';

export class WLights extends EventDispatcher {
  scene: Scene;
  debugPain: WDebugPane;

  ambientLight: AmbientLight;

  pointLight: PointLight;
  pointLightHelper: PointLightHelper;

  directionalLight: DirectionalLight;
  directionalLightHelper: DirectionalLightHelper;

  constructor(world: World) {
    super();
    this.scene = world.scene;
    this.debugPain = world.debugPane;

    // Ambient light
    this.ambientLight = new AmbientLight('#ffffff', 2);
    this.scene.add(this.ambientLight);

    // Point light
    this.pointLight = new PointLight('#ff0000', 200, 100);
    this.pointLight.position.set(3, 3, 0);
    this.scene.add(this.pointLight);

    this.pointLightHelper = new PointLightHelper(this.pointLight);
    this.scene.add(this.pointLightHelper);

    // Directional light
    this.directionalLight = new DirectionalLight('#00ff00', 1);
    this.directionalLight.position.set(-2, 2, 2);
    this.scene.add(this.directionalLight);

    this.directionalLightHelper = new DirectionalLightHelper(this.directionalLight);
    this.scene.add(this.directionalLightHelper);
    this.addDirectionalLightDebug();
  }

  addDirectionalLightDebug() {
    this.debugPain.lightsFolder.addInput(this.directionalLight, 'intensity', {
      min: 0,
      max: 100,
      step: 0.01,
      label: 'DL intensity',
    });
    this.debugPain.lightsFolder.addInput(this.directionalLight.position, 'x', {
      min: -10,
      max: 10,
      step: 0.001,
      label: 'DL PositionX',
    });
    this.debugPain.lightsFolder.addInput(this.directionalLight.position, 'y', {
      min: -10,
      max: 10,
      step: 0.001,
      label: 'DL PositionY',
    });
    this.debugPain.lightsFolder.addInput(this.directionalLight.position, 'z', {
      min: -10,
      max: 10,
      step: 0.001,
      label: 'DL PositionZ',
    });
  }
}
