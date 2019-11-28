import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { STRIKETHROUGH_TYPE, STRIKETHROUGH_HOTKEY, STRIKETHROUGH_COMPONENT } from './constants';

export const createStrikethrough = createToggleMarkCreator({
  type: STRIKETHROUGH_TYPE,
  hotkey: STRIKETHROUGH_HOTKEY,
  component: STRIKETHROUGH_COMPONENT
});
