import { Element } from 'slate';
import { WithElementType } from '../../typings/element';

export interface LinkElement extends Element, WithElementType {
  url: string;
}
