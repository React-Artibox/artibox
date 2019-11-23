import { RenderAttributes } from 'slate-react';

export interface LinkProps extends RenderAttributes {
  href: string;
  target: string;
}

const Link = 'a';

export default Link;
