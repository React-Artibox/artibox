import { ReactHTML, ComponentType } from 'react';
import { RenderAttributes } from 'slate-react';

export type ListOrderedTypeKey = 'ordered' | 'unordered';
export type ListTypeKey = ListOrderedTypeKey | 'item';
export type ListTypes = {
  [k in ListTypeKey]: string;
};
export type ListComponents = {
  [k in ListTypeKey]: keyof ReactHTML | ComponentType<RenderAttributes>;
};
