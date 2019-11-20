import { createToggleMarkUtils, createToggleMarkHandlers, createToggleMark } from '@artibox/slate-toggle-mark';
import {
  ITALIC_TYPE,
  ITALIC_COMPONENT,
  ITALIC_HOTKEY,
  ITALIC_UTIL_IS_ACTIVE,
  ITALIC_UTIL_ADD,
  ITALIC_UTIL_REMOVE,
  ITALIC_UTIL_TOGGLE
} from './italic.constants';

export const ItalicUtils = createToggleMarkUtils({
  type: ITALIC_TYPE,
  isActive: ITALIC_UTIL_IS_ACTIVE,
  add: ITALIC_UTIL_ADD,
  remove: ITALIC_UTIL_REMOVE,
  toggle: ITALIC_UTIL_TOGGLE
});

export const ItalicHandlers = createToggleMarkHandlers(ITALIC_UTIL_TOGGLE);

export const Italic = createToggleMark({
  Utils: ItalicUtils,
  Handlers: ItalicHandlers,
  type: ITALIC_TYPE,
  component: ITALIC_COMPONENT,
  hotkey: ITALIC_HOTKEY
});
