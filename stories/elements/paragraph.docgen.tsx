import { ReactParagraph, ReactParagraphCreateRenderElementOptions } from '@artibox/slate-react/paragraph';

export const ReactParagraphDocgen = (t: ReactParagraph) => t;
export const createRenderElementDocgen = (options: ReactParagraphCreateRenderElementOptions) => options;

export const paragraphDocgen = {
  ReactParagraph: ReactParagraphDocgen,
  '.createRenderElement': createRenderElementDocgen
};
