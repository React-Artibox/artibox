import { Element, Text } from 'slate';
import { WithMarkType, WithElementType } from '@artibox/slate-common';

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

export interface CreateRenderMarkOptionsBase<M, P extends RenderMarkPropsBase<M>> extends WithMarkType {
  render: (props: P) => JSX.Element;
}

export interface CreateRenderElementOptionsBase<P extends RenderElementPropsBase<Element>> extends WithElementType {
  render: (props: P) => JSX.Element | null | undefined;
}
