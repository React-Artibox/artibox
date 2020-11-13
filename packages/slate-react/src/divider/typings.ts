import { Divider, DividerElement } from '@artibox/slate-common/divider';
import { WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderDividerElementProps = RenderElementProps<DividerElement>;

export type RenderDividerElement = (props: RenderDividerElementProps) => JSX.Element | null | undefined;

export interface ReactDividerCreateRenderElementOptions {
  render?: RenderDividerElement;
}

export interface ReactDivider extends Divider, WithCreateRenderElement<[ReactDividerCreateRenderElementOptions?]> {}
