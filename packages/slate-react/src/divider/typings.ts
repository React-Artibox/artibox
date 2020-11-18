import { Divider, DividerElement } from '@artibox/slate-common/divider';
import { WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderDividerElementProps = RenderElementProps<DividerElement>;

export interface ReactDividerCreateRenderElementOptions {
  render?: (props: RenderDividerElementProps) => JSX.Element | null | undefined;
}

export interface ReactDivider extends Divider, WithCreateRenderElement<[ReactDividerCreateRenderElementOptions?]> {}
