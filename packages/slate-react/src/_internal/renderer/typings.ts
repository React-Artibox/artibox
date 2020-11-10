import { Element, Text } from 'slate';

export interface RenderLeafPropsBase {
  children: any;
  leaf: Text;
}

export interface RenderMarkPropsBase<M> extends RenderLeafPropsBase {
  mark: M;
}

export interface RenderElementPropsBase<E extends Element = Element> {
  children: any;
  element: E;
}

export interface CreateRenderMarkOptionsBase<M, P extends RenderMarkPropsBase<M>> {
  type: string;
  render: (props: P) => JSX.Element;
}

export interface CreateRenderElementOptionsBase<P extends RenderElementPropsBase<Element>> {
  type: string;
  render: (props: P) => JSX.Element | null | undefined;
}
