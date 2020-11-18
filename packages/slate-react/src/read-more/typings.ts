import { ReadMore, ReadMoreElement } from '@artibox/slate-common/read-more';
import { WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderReadMoreElementProps = RenderElementProps<ReadMoreElement>;

export interface ReactReadMoreCreateRenderElementOptions {
  render?: (props: RenderReadMoreElementProps) => JSX.Element | null | undefined;
}

export interface ReactReadMore extends ReadMore, WithCreateRenderElement<[ReactReadMoreCreateRenderElementOptions?]> {}
