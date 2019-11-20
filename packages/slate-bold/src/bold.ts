import { createToggleMarkUtils, createToggleMarkHandlers, createToggleMark } from '@artibox/slate-toggle-mark';
import {
  BOLD_TYPE,
  BOLD_COMPONENT,
  BOLD_HOTKEY,
  BOLD_UTIL_IS_ACTIVE,
  BOLD_UTIL_ADD,
  BOLD_UTIL_REMOVE,
  BOLD_UTIL_TOGGLE
} from './bold.constants';

export const BoldUtils = createToggleMarkUtils({
  type: BOLD_TYPE,
  isActive: BOLD_UTIL_IS_ACTIVE,
  add: BOLD_UTIL_ADD,
  remove: BOLD_UTIL_REMOVE,
  toggle: BOLD_UTIL_TOGGLE
});

export const BoldHandlers = createToggleMarkHandlers(BOLD_UTIL_TOGGLE);

export const Bold = createToggleMark({
  Utils: BoldUtils,
  Handlers: BoldHandlers,
  type: BOLD_TYPE,
  component: BOLD_COMPONENT,
  hotkey: BOLD_HOTKEY
});
