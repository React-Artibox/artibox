import { Element, Text } from 'slate';

export interface ReadMoreElement extends Element {
  type: string;
  children: [Text];
}
