import { Element } from 'slate';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingElement extends Element {
  type: string;
  level: HeadingLevel;
}
