import { createToggleMarkUtils, createToggleMarkHandlers, createToggleMark } from '@artibox/slate-toggle-mark';
import {
  HIGHLIGHT_TYPE,
  HIGHLIGHT_COMPONENT,
  HIGHLIGHT_HOTKEY,
  HIGHLIGHT_UTIL_IS_ACTIVE,
  HIGHLIGHT_UTIL_ADD,
  HIGHLIGHT_UTIL_REMOVE,
  HIGHLIGHT_UTIL_TOGGLE
} from './highlight.constants';

export const HighlightUtils = createToggleMarkUtils({
  type: HIGHLIGHT_TYPE,
  isActive: HIGHLIGHT_UTIL_IS_ACTIVE,
  add: HIGHLIGHT_UTIL_ADD,
  remove: HIGHLIGHT_UTIL_REMOVE,
  toggle: HIGHLIGHT_UTIL_TOGGLE
});

export const HighlightHandlers = createToggleMarkHandlers(HIGHLIGHT_UTIL_TOGGLE);

export const Highlight = createToggleMark({
  Utils: HighlightUtils,
  Handlers: HighlightHandlers,
  type: HIGHLIGHT_TYPE,
  component: HIGHLIGHT_COMPONENT,
  hotkey: HIGHLIGHT_HOTKEY
});
