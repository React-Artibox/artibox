import { createToggleMarkIsActive, createToggleMarkToggle } from '@artibox/slate-plugin-toggle-mark';
import { UNDERLINE_QUERY_HAS, UNDERLINE_COMMAND_TOGGLE } from './underline.constants';

export const isUnderlineActive = createToggleMarkIsActive(UNDERLINE_QUERY_HAS);

export const underlineToggle = createToggleMarkToggle(UNDERLINE_COMMAND_TOGGLE);
