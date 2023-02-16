import { IResource, ResourceType } from '@/base/types';

export enum ResourceNames {
  DuckModel = 'duckModel',
  HelmetModel = 'helmetModel',
}

export const resources: IResource[] = [
  { name: ResourceNames.DuckModel, path: '/models/duck/Duck.gltf', type: ResourceType.GLTFModel },
  { name: ResourceNames.HelmetModel, path: '/models/helmet/Helmet.gltf', type: ResourceType.GLTFModel },
];
