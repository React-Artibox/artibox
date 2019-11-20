import { createToggleMarkUtils, createToggleMarkHandlers, createToggleMark } from '@artibox/slate-toggle-mark';
import {
  STRIKETHROUGH_TYPE,
  STRIKETHROUGH_COMPONENT,
  STRIKETHROUGH_HOTKEY,
  STRIKETHROUGH_UTIL_IS_ACTIVE,
  STRIKETHROUGH_UTIL_ADD,
  STRIKETHROUGH_UTIL_REMOVE,
  STRIKETHROUGH_UTIL_TOGGLE
} from './strikethrough.constants';

export const StrikethroughUtils = createToggleMarkUtils({
  type: STRIKETHROUGH_TYPE,
  isActive: STRIKETHROUGH_UTIL_IS_ACTIVE,
  add: STRIKETHROUGH_UTIL_ADD,
  remove: STRIKETHROUGH_UTIL_REMOVE,
  toggle: STRIKETHROUGH_UTIL_TOGGLE
});

export const StrikethroughHandlers = createToggleMarkHandlers(STRIKETHROUGH_UTIL_TOGGLE);

export const Strikethrough = createToggleMark({
  Utils: StrikethroughUtils,
  Handlers: StrikethroughHandlers,
  type: STRIKETHROUGH_TYPE,
  component: STRIKETHROUGH_COMPONENT,
  hotkey: STRIKETHROUGH_HOTKEY
});
