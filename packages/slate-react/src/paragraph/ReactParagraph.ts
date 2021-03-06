import { Paragraph, ParagraphElement, PARAGRAPH_TYPE } from '@artibox/slate-common/paragraph';
import { createRenderElement, WithCreateRenderElement, RenderElementProps } from '../core';
import { defaultRenderParagraphElement } from './defaultRenderParagraphElement';

export type RenderParagraphElementProps = RenderElementProps<ParagraphElement>;

export interface ReactParagraphCreateRenderElementOptions {
  render?: (props: RenderParagraphElementProps) => JSX.Element | null | undefined;
}

export interface ReactParagraph
  extends Paragraph,
    WithCreateRenderElement<[ReactParagraphCreateRenderElementOptions?]> {}

export const ReactParagraph: ReactParagraph = {
  ...Paragraph,
  createRenderElement: ({ render = defaultRenderParagraphElement } = {}) =>
    createRenderElement({ type: PARAGRAPH_TYPE, render })
};
