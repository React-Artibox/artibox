import { Element, Text } from 'slate';
import { WithElementType } from '../../typings/element';

export interface DividerElement extends Element, WithElementType {
  children: [Text];
}
