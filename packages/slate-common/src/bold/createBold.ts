import { createToggleMarkCreator } from '../toggle-mark';
import { BOLD_TYPE } from './common';

export const createBold = createToggleMarkCreator({
  type: BOLD_TYPE
});
