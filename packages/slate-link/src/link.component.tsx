import { RenderAttributes } from 'slate-react';
import { LINK_COMPONENT } from './link.constants';

export interface LinkProps extends RenderAttributes {
  href: string;
  target: string;
}

const Link = LINK_COMPONENT;

export default Link;
