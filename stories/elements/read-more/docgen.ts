import {
  ReactReadMore,
  ReactReadMoreCreateRenderElementOptions,
  ReadMoreElement,
  RenderReadMoreElementProps
} from '@artibox/slate-react/read-more';
import { JsxSerializeReadMoreProps } from '@artibox/slate-react/read-more/jsx-serializer';

export const createRenderElementDocgen = (options: ReactReadMoreCreateRenderElementOptions) => options;
export const ReactReadMoreDocgen = (t: ReactReadMore) => t;
export const ReadMoreElementDocgen = (element: ReadMoreElement) => element;
export const RenderReadMoreElementPropsDocgen = (props: RenderReadMoreElementProps) => props;
export const JsxSerializeReadMorePropsDocgen = (props: JsxSerializeReadMoreProps) => props;
