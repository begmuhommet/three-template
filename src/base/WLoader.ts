import * as THREE from 'three';
import { CubeTextureLoader, EventDispatcher, LoadingManager, Mesh, PlaneGeometry, ShaderMaterial, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { IResource, ResourceType } from '@/base/types';
import { CustomEvents } from '@/data/customEvents';
import { ResourceNames } from '@/data/resources';
import { World } from '@/World';
import overlayVertexShader from '@/shaders/overlay/vertex.glsl';
import overlayFragmentShader from '@/shaders/overlay/fragment.glsl';
import { gsap } from 'gsap';

export class WLoader extends EventDispatcher {
  world: World;
  sources: IResource[] | null = null;
  loadingEl = document.querySelector('.loader') as HTMLDivElement;

  items: { [key in ResourceNames]?: any } = {};
  toLoad = 0;
  loaded = 0;

  loadingManager: LoadingManager;
  gltfLoader: GLTFLoader;
  textureLoader: TextureLoader;
  cubeTextureLoader: CubeTextureLoader;

  overlayShaderMaterial: ShaderMaterial | null = null;

  constructor(world: World, sources: IResource[]) {
    super();

    this.world = world;
    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.loadingManager = new LoadingManager();
    this.loadingManager.onLoad = () => this.onLoad();
    this.loadingManager.onProgress = () => this.onProgress();
    this.loadingManager.onError = (url: string) => this.onError(url);

    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager);

    this.init();
    this.startLoading();
  }

  init() {
    this.overlayShaderMaterial = new ShaderMaterial({
      transparent: true,
      uniforms: { uAlpha: { value: 1 } },
      vertexShader: overlayVertexShader,
      fragmentShader: overlayFragmentShader,
    });

    const mesh = new Mesh(new PlaneGeometry(2, 2, 1, 1), this.overlayShaderMaterial);
    this.world.scene.add(mesh);
  }

  async startLoading() {
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

  onLoad() {
    if (!this.loadingEl || !this.overlayShaderMaterial) {
      return;
    }
    setTimeout(() => {
      gsap.to((this.overlayShaderMaterial as any).uniforms.uAlpha, { duration: 1, value: 0, delay: 0.5 });
      this.loadingEl.classList.add('end');
      this.loadingEl.style.transform = '';
    }, 1500);
  }

  onProgress() {
    const percent = this.loaded / this.toLoad;
    if (this.loadingEl) {
      this.loadingEl.style.transform = `scaleX(${percent})`;
    }
  }

  onError(url: string) {
    console.log('Load error: ', url);
  }

  sourceLoaded(source: IResource, file: any) {
    this.items[source.name as ResourceNames] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.dispatchEvent({ type: CustomEvents.ResourceLoaded });
    }
  }
}
