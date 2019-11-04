import { createToggleMarkPlugin } from '@artibox/slate-plugin-toggle-mark';
import {
  HIGHLIGHT_TYPE,
  HIGHLIGHT_COMPONENT,
  HIGHLIGHT_HOTKEY,
  HIGHLIGHT_QUERY_HAS,
  HIGHLIGHT_COMMAND_ADD,
  HIGHLIGHT_COMMAND_REMOVE,
  HIGHLIGHT_COMMAND_TOGGLE
} from './highlight.constants';

export const HighlightPlugin = createToggleMarkPlugin({
  type: HIGHLIGHT_TYPE,
  component: HIGHLIGHT_COMPONENT,
  hotkey: HIGHLIGHT_HOTKEY,
  queryHas: HIGHLIGHT_QUERY_HAS,
  commandAdd: HIGHLIGHT_COMMAND_ADD,
  commandRemove: HIGHLIGHT_COMMAND_REMOVE,
  commandToggle: HIGHLIGHT_COMMAND_TOGGLE
});
