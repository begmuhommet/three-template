import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class WModelLoader {
  loading = false;
  loadingManager: LoadingManager;
  gltfLoader: GLTFLoader;

  constructor() {
    this.loadingManager = new LoadingManager();
    // this.loadingManager.onStart = this.start;
    // this.loadingManager.onProgress = this.progress;
    // this.loadingManager.onLoad = this.loaded;
    // this.loadingManager.onError = this.error;

    this.gltfLoader = new GLTFLoader(this.loadingManager);
  }

  async loadModel(path: string) {
    return await this.gltfLoader.loadAsync(path);
  }

  start(url: string, itemsLoaded: number, itemsTotal: number) {
    this.loading = true;
    console.log('Start -> ', url, itemsLoaded, itemsTotal);
  }

  loaded() {
    this.loading = false;
    console.log('Loaded successfully !');
  }

  error(url: string) {
    this.loading = false;
    console.log('Error -> ', url);
    throw new Error(url);
  }

  progress(url: string, itemsLoaded: number, itemsTotal: number) {
    console.log('Progress -> ', url, itemsLoaded, itemsTotal);
  }
}
