import { createToggleMarkCreator } from '../toggle-mark';
import { HIGHLIGHT_TYPE } from './common';

export const createHighlight = createToggleMarkCreator({
  type: HIGHLIGHT_TYPE
});
