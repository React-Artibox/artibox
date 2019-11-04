import { createToggleMarkPlugin } from '@artibox/slate-plugin-toggle-mark';
import {
  STRIKETHROUGH_TYPE,
  STRIKETHROUGH_COMPONENT,
  STRIKETHROUGH_HOTKEY,
  STRIKETHROUGH_QUERY_HAS,
  STRIKETHROUGH_COMMAND_ADD,
  STRIKETHROUGH_COMMAND_REMOVE,
  STRIKETHROUGH_COMMAND_TOGGLE
} from './strikethrough.constants';

export const StrikethroughPlugin = createToggleMarkPlugin({
  type: STRIKETHROUGH_TYPE,
  component: STRIKETHROUGH_COMPONENT,
  hotkey: STRIKETHROUGH_HOTKEY,
  queryHas: STRIKETHROUGH_QUERY_HAS,
  commandAdd: STRIKETHROUGH_COMMAND_ADD,
  commandRemove: STRIKETHROUGH_COMMAND_REMOVE,
  commandToggle: STRIKETHROUGH_COMMAND_TOGGLE
});
