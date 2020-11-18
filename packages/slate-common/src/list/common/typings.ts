import { Element } from 'slate';
import { WithElementType } from '../../typings/element';

export type ListRootTypeKey = 'ol' | 'ul';
export type ListItemTypeKey = 'li';
export type ListTypeKey = ListRootTypeKey | ListItemTypeKey;
export type ListTypes = Record<ListTypeKey, string>;

export interface ListElement extends Element, WithElementType {}
