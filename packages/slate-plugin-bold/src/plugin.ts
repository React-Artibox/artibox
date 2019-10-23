import { createToggleMarkPlugin } from '@artibox/slate-common';
import {
  BOLD_TYPE,
  BOLD_COMPONENT,
  BOLD_HOTKEY,
  BOLD_QUERY_HAS,
  BOLD_COMMAND_ADD,
  BOLD_COMMAND_REMOVE,
  BOLD_COMMAND_TOGGLE
} from './constants';

export const BoldPlugin = createToggleMarkPlugin({
  type: BOLD_TYPE,
  component: BOLD_COMPONENT,
  hotkey: BOLD_HOTKEY,
  queryHas: BOLD_QUERY_HAS,
  commandAdd: BOLD_COMMAND_ADD,
  commandRemove: BOLD_COMMAND_REMOVE,
  commandToggle: BOLD_COMMAND_TOGGLE
});
