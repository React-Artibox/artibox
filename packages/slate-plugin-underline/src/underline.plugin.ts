import { createToggleMarkPlugin } from '@artibox/slate-plugin-toggle-mark';
import {
  UNDERLINE_TYPE,
  UNDERLINE_COMPONENT,
  UNDERLINE_HOTKEY,
  UNDERLINE_QUERY_HAS,
  UNDERLINE_COMMAND_ADD,
  UNDERLINE_COMMAND_REMOVE,
  UNDERLINE_COMMAND_TOGGLE
} from './underline.constants';

export const UnderlinePlugin = createToggleMarkPlugin({
  type: UNDERLINE_TYPE,
  component: UNDERLINE_COMPONENT,
  hotkey: UNDERLINE_HOTKEY,
  queryHas: UNDERLINE_QUERY_HAS,
  commandAdd: UNDERLINE_COMMAND_ADD,
  commandRemove: UNDERLINE_COMMAND_REMOVE,
  commandToggle: UNDERLINE_COMMAND_TOGGLE
});
