import { IResource, ResourceType } from '@/base/types';

export const resources: IResource[] = [
  { name: 'CarModel', path: '/models/car.glb', type: ResourceType.GLTFModel },
  { name: 'CarTexture', path: '/textures/carTexture.png', type: ResourceType.Texture },
];
