import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';
import { World } from '@/World';

export class Cube {
  instance: Mesh;
  world: World;

  colors = {
    cubeColor: '#ffffff',
  };

  constructor(world: World) {
    this.world = world;

    const geometry = new BoxGeometry(2, 2, 2, 16, 16);
    const material = new MeshStandardMaterial({ color: this.colors.cubeColor, wireframe: true });
    this.instance = new Mesh(geometry, material);

    this.world.scene.add(this.instance);
    this.setOptions();
    this.addToDebugPane();
  }

  setOptions() {
    this.instance.rotation.set(0.5, 1, 0.5);
    this.world.renderer.addEventListener('tick', () => this.tick());
  }

  addToDebugPane() {
    this.world.debugPane.componentsFolder.addInput(this.instance.position, 'x', {
      min: -10,
      max: 10,
      step: 0.001,
      label: 'Cube positionX',
    });
  }

  tick() {
    this.instance.rotation.z += 0.005;
  }
}
