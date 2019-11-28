import { RenderAttributes } from 'slate-react';
import { InputData } from '@artibox/slate-common';

export interface InputBlockProps extends RenderAttributes {
  isEmpty: boolean;
  getPlaceholder: InputData['getPlaceholder'];
}
