import { Link, LinkElement } from '@artibox/slate-common/link';
import { RenderElementProps, ReactWithable, WithCreateRenderElement } from '../core';

export interface RenderLinkElementProps extends RenderElementProps<LinkElement> {
  placement?: 'top' | 'bottom';
  target?: string;
}

export type RenderLinkElement = (props: RenderLinkElementProps) => JSX.Element | null | undefined;

export interface ReactLinkCreateRenderElementOptions {
  render?: RenderLinkElement;
}

export interface ReactLink
  extends Omit<Link, 'with'>,
    WithCreateRenderElement<[ReactLinkCreateRenderElementOptions?]>,
    ReactWithable {}
