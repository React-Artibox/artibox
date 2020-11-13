import { Element } from 'slate';
import { WithElementType } from '../../typings/element';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingElement extends Element, WithElementType {
  level: HeadingLevel;
}
