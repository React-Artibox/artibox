import { RenderAttributes } from 'slate-react';
import { InputConfig } from '@artibox/slate-common';

export interface InputBlockProps extends RenderAttributes {
  isEmpty: boolean;
  getPlaceholder: InputConfig['getPlaceholder'];
}
