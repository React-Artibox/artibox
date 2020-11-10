import { createToggleMarkCreator } from '../toggle-mark';
import { ITALIC_TYPE } from './common';

export const createItalic = createToggleMarkCreator({
  type: ITALIC_TYPE
});
