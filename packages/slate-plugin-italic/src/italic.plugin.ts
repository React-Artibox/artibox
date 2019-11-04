import { createToggleMarkPlugin } from '@artibox/slate-plugin-toggle-mark';
import {
  ITALIC_TYPE,
  ITALIC_COMPONENT,
  ITALIC_HOTKEY,
  ITALIC_QUERY_HAS,
  ITALIC_COMMAND_ADD,
  ITALIC_COMMAND_REMOVE,
  ITALIC_COMMAND_TOGGLE
} from './italic.constants';

export const ItalicPlugin = createToggleMarkPlugin({
  type: ITALIC_TYPE,
  component: ITALIC_COMPONENT,
  hotkey: ITALIC_HOTKEY,
  queryHas: ITALIC_QUERY_HAS,
  commandAdd: ITALIC_COMMAND_ADD,
  commandRemove: ITALIC_COMMAND_REMOVE,
  commandToggle: ITALIC_COMMAND_TOGGLE
});
