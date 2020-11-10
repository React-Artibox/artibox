import { ReadMore, ReadMoreElement } from '@artibox/slate-common/read-more';
import { WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderReadMoreElementProps = RenderElementProps<ReadMoreElement>;

export type RenderReadMoreElement = (props: RenderReadMoreElementProps) => JSX.Element | null | undefined;

export interface ReactReadMoreCreateRenderElementOptions {
  render?: RenderReadMoreElement;
}

export type ReactReadMore = ReadMore & WithCreateRenderElement<[ReactReadMoreCreateRenderElementOptions?]>;
