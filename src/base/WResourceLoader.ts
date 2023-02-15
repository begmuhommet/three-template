import * as THREE from 'three';
import { CubeTextureLoader, EventDispatcher, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { IResource } from '@/base/types';

export class Resources extends EventDispatcher {
  sources: IResource[] | null = null;
  items: any = {};
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

    this.startLoading();

    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    if (!this.sources) return;

    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.gltfLoader.load(source.path, file => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'texture') {
        this.textureLoader.load(source.path, file => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.cubeTextureLoader.load(source.path as any, file => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: IResource, file: any) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.dispatchEvent({ type: 'resource_loaded' });
    }
  }
}
