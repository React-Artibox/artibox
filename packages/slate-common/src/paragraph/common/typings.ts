import { Element } from 'slate';

export type ParagraphType = 'p';

export interface WithParagraphElementType {
  /**
   * The default element in slate is paragraph element.
   * Not customizable.
   */
  type: ParagraphType;
}

export interface ParagraphElement extends Element, WithParagraphElementType {}
