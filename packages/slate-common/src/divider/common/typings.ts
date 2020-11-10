import { Element, Text } from 'slate';

export interface DividerElement extends Element {
  type: string;
  children: [Text];
}
