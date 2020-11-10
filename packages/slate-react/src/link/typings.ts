import { Link, LinkElement } from '@artibox/slate-common/link';
import { WithCreateRenderElement, RenderElementProps } from '../core';
import { ReactWithable } from '../core';

export interface RenderLinkElementProps extends RenderElementProps<LinkElement> {
  placement?: 'top' | 'bottom';
  target?: string;
}

export type RenderLinkElement = (props: RenderLinkElementProps) => JSX.Element | null | undefined;

export interface ReactLinkCreateRenderElementOptions {
  render?: RenderLinkElement;
}

export type ReactLink = Omit<Link, 'with'> &
  WithCreateRenderElement<[ReactLinkCreateRenderElementOptions?]> &
  ReactWithable;
