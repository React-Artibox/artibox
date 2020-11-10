import { Element } from 'slate';

export type ParagraphType = 'p';

export interface ParagraphElement extends Element {
  type: ParagraphType;
}
