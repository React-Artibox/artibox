import { BlockquoteElement, Blockquote } from '@artibox/slate-common/blockquote';
import { WithCreateHandlers, WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderBlockquoteElementProps = RenderElementProps<BlockquoteElement>;

export type RenderBlockquoteElement = (props: RenderBlockquoteElementProps) => JSX.Element | null | undefined;

export interface ReactBlockquoteCreateHandlersOptions {
  /**
   * The hotkey to toggle blockquote.
   */
  hotkey?: string;
}

export interface ReactBlockquoteCreateRenderElementOptions {
  render?: RenderBlockquoteElement;
}

export interface ReactBlockquote
  extends Blockquote,
    WithCreateHandlers<[ReactBlockquoteCreateHandlersOptions?]>,
    WithCreateRenderElement<[ReactBlockquoteCreateRenderElementOptions?]> {}
