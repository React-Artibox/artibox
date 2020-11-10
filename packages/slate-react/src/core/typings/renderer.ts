import { Element } from 'slate';
import {
  RenderElementProps as SlateReactRenderElementProps,
  RenderLeafProps as SlateRenderLeafProps
} from 'slate-react';
import {
  CreateRenderElementOptionsBase,
  CreateRenderMarkOptionsBase,
  RenderElementPropsBase,
  RenderLeafPropsBase,
  RenderMarkPropsBase
} from '../../_internal/renderer/typings';

export type RenderLeafProps = RenderLeafPropsBase & Pick<SlateRenderLeafProps, 'attributes'>;

export type RenderMarkProps<M> = RenderMarkPropsBase<M>;

export type RenderElementProps<E extends Element = Element> = RenderElementPropsBase<E> &
  Pick<SlateReactRenderElementProps, 'attributes'>;

export type CreateRenderMarkOptions<M> = CreateRenderMarkOptionsBase<M, RenderMarkProps<M>>;

export type CreateRenderElementOptions<P extends RenderElementProps<Element>> = CreateRenderElementOptionsBase<P>;

export interface WithCreateRenderLeaf<P extends any[] = []> {
  createRenderLeaf: (...params: P) => (props: RenderLeafProps) => JSX.Element;
}

export interface WithCreateRenderElement<P extends any[] = []> {
  createRenderElement: (...params: P) => (props: RenderElementProps) => JSX.Element | null | undefined;
}
