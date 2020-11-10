import { createToggleMarkCreator } from '../toggle-mark';
import { UNDERLINE_TYPE } from './common';

export const createUnderline = createToggleMarkCreator({
  type: UNDERLINE_TYPE
});
