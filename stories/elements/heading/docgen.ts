import {
  ReactHeading,
  HeadingLevel,
  ReactHeadingCreateHandlersOptions,
  ReactHeadingCreateRenderElementOptions,
  HeadingElement,
  RenderHeadingElementProps
} from '@artibox/slate-react/heading';
import { JsxSerializeHeadingElementProps } from '@artibox/slate-react/heading/jsx-serializer';

export const createHandlersDocgen = (options: ReactHeadingCreateHandlersOptions) => options;
export const createRenderElementDocgen = (options: ReactHeadingCreateRenderElementOptions) => options;
export const ReactHeadingDocgen = (t: ReactHeading<HeadingLevel>) => t;
export const HeadingElementDocgen = (element: HeadingElement) => element;
export const RenderHeadingElementPropsDocgen = (props: RenderHeadingElementProps) => props;
export const JsxSerializeHeadingElementPropsDocgen = (props: JsxSerializeHeadingElementProps) => props;
