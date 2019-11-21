import { ReactHTML, ComponentType } from 'react';
import { RenderAttributes } from 'slate-react';

export type LIST_ORDERED_TYPES = 'ordered' | 'unordered';
export type LIST_TYPES = {
  [t in LIST_ORDERED_TYPES | 'item']: string;
};
export const LIST_TYPES = {
  ordered: 'ordered list',
  unordered: 'unordered list',
  item: 'list item'
} as const;

export type LIST_COMPONENTS = {
  [k in keyof LIST_TYPES]: keyof ReactHTML | ComponentType<RenderAttributes>;
};
export const LIST_COMPONENTS = {
  ordered: 'ol',
  unordered: 'ul',
  item: 'li'
} as const;
