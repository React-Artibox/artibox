import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { BOLD_TYPE, BOLD_HOTKEY, BOLD_COMPONENT } from './constants';

export const createBold = createToggleMarkCreator({
  type: BOLD_TYPE,
  hotkey: BOLD_HOTKEY,
  component: BOLD_COMPONENT
});
