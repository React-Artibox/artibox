import {
  ReactList,
  ReactListCreateRenderElementOptions,
  ListElement,
  RenderListElementProps
} from '@artibox/slate-react/list';
import { JsxSerializeListElementProps } from '@artibox/slate-react/list/jsx-serializer';

export const createHandlersDocgen = (options: Record<string, unknown>) => options;
export const createRenderElementDocgen = (options: ReactListCreateRenderElementOptions) => options;
export const ReactListDocgen = (t: ReactList) => t;
export const ListElementDocgen = (element: ListElement) => element;
export const RenderListElementPropsDocgen = (props: RenderListElementProps) => props;
export const JsxSerializeListElementPropsDocgen = (props: JsxSerializeListElementProps) => props;
