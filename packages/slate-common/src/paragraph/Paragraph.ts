import { Descendant } from 'slate';
import { ParagraphElement, PARAGRAPH_TYPE } from './common';

export interface Paragraph {
  type: 'p';
  createParagraphElement(children?: Descendant[]): ParagraphElement;
}

export const Paragraph: Paragraph = {
  type: PARAGRAPH_TYPE,
  createParagraphElement: (children = [{ text: '' }]) => ({ type: PARAGRAPH_TYPE, children })
};
