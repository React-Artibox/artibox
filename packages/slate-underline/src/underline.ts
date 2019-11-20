import { createToggleMarkUtils, createToggleMarkHandlers, createToggleMark } from '@artibox/slate-toggle-mark';
import {
  UNDERLINE_TYPE,
  UNDERLINE_COMPONENT,
  UNDERLINE_HOTKEY,
  UNDERLINE_UTIL_IS_ACTIVE,
  UNDERLINE_UTIL_ADD,
  UNDERLINE_UTIL_REMOVE,
  UNDERLINE_UTIL_TOGGLE
} from './underline.constants';

export const UnderlineUtils = createToggleMarkUtils({
  type: UNDERLINE_TYPE,
  isActive: UNDERLINE_UTIL_IS_ACTIVE,
  add: UNDERLINE_UTIL_ADD,
  remove: UNDERLINE_UTIL_REMOVE,
  toggle: UNDERLINE_UTIL_TOGGLE
});

export const UnderlineHandlers = createToggleMarkHandlers(UNDERLINE_UTIL_TOGGLE);

export const Underline = createToggleMark({
  Utils: UnderlineUtils,
  Handlers: UnderlineHandlers,
  type: UNDERLINE_TYPE,
  component: UNDERLINE_COMPONENT,
  hotkey: UNDERLINE_HOTKEY
});
