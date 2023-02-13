import { World } from '@/World';
import { FolderApi, Pane } from 'tweakpane';

export class DebugPane {
  world: World;
  instance: Pane;

  lightsFolder: FolderApi;
  componentsFolder: FolderApi;

  constructor(world: World) {
    this.world = world;
    this.instance = new Pane();

    this.lightsFolder = this.instance.addFolder({ title: 'Lights' });
    this.componentsFolder = this.instance.addFolder({ title: 'Components' });
  }
}
