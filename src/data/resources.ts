import { IResource, ResourceType } from '@/base/types';

export enum ResourceNames {
  HelmetModel = 'HelmetModel',
  CubeTexture = 'CubeTexture',
}

const cubeTexturePaths = [
  '/textures/environment/3/px.jpg',
  '/textures/environment/3/nx.jpg',
  '/textures/environment/3/py.jpg',
  '/textures/environment/3/ny.jpg',
  '/textures/environment/3/pz.jpg',
  '/textures/environment/3/nz.jpg',
];

export const resources: IResource[] = [
  { name: ResourceNames.HelmetModel, path: '/models/DamagedHelmet.glb', type: ResourceType.GLTFModel },
  { name: ResourceNames.CubeTexture, path: cubeTexturePaths, type: ResourceType.CubeTexture },
];
