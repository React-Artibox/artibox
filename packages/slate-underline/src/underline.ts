import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { UNDERLINE_TYPE, UNDERLINE_HOTKEY, UNDERLINE_COMPONENT } from './constants';

export const createUnderline = createToggleMarkCreator({
  type: UNDERLINE_TYPE,
  hotkey: UNDERLINE_HOTKEY,
  component: UNDERLINE_COMPONENT
});
