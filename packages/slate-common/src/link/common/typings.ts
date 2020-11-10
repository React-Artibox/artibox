import { Element } from 'slate';

export interface LinkElement extends Element {
  type: string;
  url: string;
}
