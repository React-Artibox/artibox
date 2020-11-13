import { Descendant } from 'slate';
import { ParagraphElement, PARAGRAPH_TYPE, WithParagraphElementType } from './common';

export interface Paragraph extends WithParagraphElementType {
  createParagraphElement(children?: Descendant[]): ParagraphElement;
}

export const Paragraph: Paragraph = {
  type: PARAGRAPH_TYPE,
  createParagraphElement: (children = [{ text: '' }]) => ({ type: PARAGRAPH_TYPE, children })
};
