import {
  ReactParagraph,
  ReactParagraphCreateRenderElementOptions,
  ParagraphElement,
  RenderParagraphElementProps
} from '@artibox/slate-react/paragraph';
import { JsxSerializeParagraphProps } from '@artibox/slate-react/paragraph/jsx-serializer';

export const createRenderElementDocgen = (options: ReactParagraphCreateRenderElementOptions) => options;
export const ReactParagraphDocgen = (t: ReactParagraph) => t;
export const ParagraphElementDocgen = (element: ParagraphElement) => element;
export const RenderParagraphElementPropsDocgen = (props: RenderParagraphElementProps) => props;
export const JsxSerializeParagraphPropsDocgen = (props: JsxSerializeParagraphProps) => props;
