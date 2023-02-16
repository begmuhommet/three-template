import * as THREE from 'three';
import { CubeTextureLoader, EventDispatcher, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { IResource, ResourceType } from '@/base/types';
import { CustomEvents } from '@/data/customEvents';
import { ResourceNames } from '@/data/resources';

export class WLoader extends EventDispatcher {
  sources: IResource[] | null = null;
  items: { [key in ResourceNames]?: any } = {};
  toLoad = 0;
  loaded = 0;

  gltfLoader: GLTFLoader;
  textureLoader: TextureLoader;
  cubeTextureLoader: CubeTextureLoader;

  constructor(sources: IResource[]) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();

    this.startLoading();
  }

  startLoading() {
    if (!this.sources) return;

    for (const source of this.sources) {
      switch (source.type) {
        case ResourceType.GLTFModel:
          this.gltfLoader.load(source.path as string, file => this.sourceLoaded(source, file));
          break;

        case ResourceType.Texture:
          this.textureLoader.load(source.path as string, file => this.sourceLoaded(source, file));
          break;

        case ResourceType.CubeTexture:
          this.cubeTextureLoader.load(source.path as string[], file => this.sourceLoaded(source, file));
          break;
      }
    }
  }

  sourceLoaded(source: IResource, file: any) {
    this.items[source.name as ResourceNames] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.dispatchEvent({ type: CustomEvents.ResourceLoaded });
    }
  }
}
