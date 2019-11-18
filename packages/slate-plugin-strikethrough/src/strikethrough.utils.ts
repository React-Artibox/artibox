import { createToggleMarkIsActive, createToggleMarkToggle } from '@artibox/slate-plugin-toggle-mark';
import { STRIKETHROUGH_QUERY_HAS, STRIKETHROUGH_COMMAND_TOGGLE } from './strikethrough.constants';

export const isStrikethroughActive = createToggleMarkIsActive(STRIKETHROUGH_QUERY_HAS);

export const strikethroughToggle = createToggleMarkToggle(STRIKETHROUGH_COMMAND_TOGGLE);
