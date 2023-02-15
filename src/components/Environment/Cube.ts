import { BoxGeometry, Mesh, MeshStandardMaterial, Scene } from 'three';
import { World } from '@/World';
import { WRenderer } from '@/base/WRenderer';
import { WDebugPane } from '@/base/WDebugPane';

export class Cube {
  instance: Mesh;
  scene: Scene;
  renderer: WRenderer;
  debugPane: WDebugPane;

  colors = {
    cubeColor: '#ffffff',
  };

  constructor(world: World) {
    this.scene = world.scene;
    this.renderer = world.renderer;
    this.debugPane = world.debugPane;

    const geometry = new BoxGeometry(2, 2, 2, 16, 16);
    const material = new MeshStandardMaterial({ color: this.colors.cubeColor, wireframe: true });
    this.instance = new Mesh(geometry, material);

    this.scene.add(this.instance);
    this.setOptions();
    this.addToDebugPane();
  }

  setOptions() {
    this.instance.rotation.set(0.5, 1, 0.5);
  }

  addToDebugPane() {
    this.debugPane.componentsFolder.addInput(this.instance.position, 'x', {
      min: -10,
      max: 10,
      step: 0.001,
      label: 'Cube positionX',
    });
  }

  tick() {
    this.instance.rotation.z += 0.001;
  }
}
