import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { ITALIC_TYPE, ITALIC_HOTKEY, ITALIC_COMPONENT } from './constants';

export const createItalic = createToggleMarkCreator({
  type: ITALIC_TYPE,
  hotkey: ITALIC_HOTKEY,
  component: ITALIC_COMPONENT
});
