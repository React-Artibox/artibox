import { createToggleMarkCreator } from '../toggle-mark';
import { STRIKETHROUGH_TYPE } from './common';

export const createStrikethrough = createToggleMarkCreator({
  type: STRIKETHROUGH_TYPE
});
