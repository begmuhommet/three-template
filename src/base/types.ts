export interface IResource {
  name: string;
  type: ResourceType;
  path: string | string[];
}

export enum ResourceType {
  GLTFModel = 'GLTFModel',
  Texture = 'Texture',
  CubeTexture = 'CubeTexture',
}
