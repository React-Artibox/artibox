import { Element, Text } from 'slate';
import { WithElementType } from '../../typings/element';

export interface ReadMoreElement extends Element, WithElementType {
  children: [Text];
}
