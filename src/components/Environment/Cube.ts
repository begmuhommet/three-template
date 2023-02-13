import { BoxGeometry, Mesh, MeshStandardMaterial, Scene } from 'three';
import { World } from '@/World';
import { WorldRenderer } from '@/base/WorldRenderer';
import { DebugPane } from '@/base/DebugPane';

export class Cube {
  instance: Mesh;
  scene: Scene;
  renderer: WorldRenderer;
  debugPane: DebugPane;

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
    this.renderer.addUpdateObjects(this);
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
