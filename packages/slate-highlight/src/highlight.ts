import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { HIGHLIGHT_TYPE, HIGHLIGHT_HOTKEY, HIGHLIGHT_COMPONENT } from './constants';

export const createHighlight = createToggleMarkCreator({
  type: HIGHLIGHT_TYPE,
  hotkey: HIGHLIGHT_HOTKEY,
  component: HIGHLIGHT_COMPONENT
});
