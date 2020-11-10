import { Heading, HeadingElement, HeadingLevel } from '@artibox/slate-common/heading';
import { WithCreateHandlers, WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderHeadingElementProps = RenderElementProps<HeadingElement>;

export type RenderHeadingElement = (props: RenderHeadingElementProps) => JSX.Element | null | undefined;

export interface ReactHeadingCreateHandlersOptions {
  hotkey?: string;
}

export interface ReactHeadingCreateRenderElementOptions {
  render?: RenderHeadingElement;
}

export type ReactHeading<L extends HeadingLevel> = Heading<L> &
  WithCreateHandlers<[ReactHeadingCreateHandlersOptions?]> &
  WithCreateRenderElement<[ReactHeadingCreateRenderElementOptions?]>;
