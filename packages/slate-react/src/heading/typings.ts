import { Heading, HeadingElement, HeadingLevel } from '@artibox/slate-common/heading';
import { WithCreateHandlers, WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderHeadingElementProps = RenderElementProps<HeadingElement>;

export interface ReactHeadingCreateHandlersOptions {
  /**
   * The hotkey to toggle heading w/ specific level.
   */
  hotkey?: string;
}

export interface ReactHeadingCreateRenderElementOptions {
  render?: (props: RenderHeadingElementProps) => JSX.Element | null | undefined;
}

export interface ReactHeading<Level extends HeadingLevel>
  extends Heading<Level>,
    WithCreateHandlers<[ReactHeadingCreateHandlersOptions?]>,
    WithCreateRenderElement<[ReactHeadingCreateRenderElementOptions?]> {}
