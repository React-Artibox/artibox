import { Link, LinkElement } from '@artibox/slate-common/link';
import { RenderElementProps, ReactWithable, WithCreateRenderElement } from '../core';

export type RenderLinkElementProps = RenderElementProps<LinkElement>;

export interface ReactLinkCreateRenderElementOptions {
  render?: (props: RenderLinkElementProps) => JSX.Element | null | undefined;
}

export interface ReactLink
  extends Omit<Link, 'with'>,
    WithCreateRenderElement<[ReactLinkCreateRenderElementOptions?]>,
    ReactWithable {}
