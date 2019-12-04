import { RenderAttributes } from 'slate-react';

export interface LinkProps extends RenderAttributes {
  href: string;
  target: string;
}
