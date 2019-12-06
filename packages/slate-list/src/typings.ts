import { RendererBaseComponent } from '@artibox/slate-common';

export type ListOrderedTypeKey = 'ordered' | 'unordered';
export type ListTypeKey = ListOrderedTypeKey | 'item';
export type ListTypes = {
  [k in ListTypeKey]: string;
};
export type ListComponents = {
  [k in ListTypeKey]: RendererBaseComponent;
};
