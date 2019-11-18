import { createToggleMarkIsActive, createToggleMarkToggle } from '@artibox/slate-plugin-toggle-mark';
import { BOLD_QUERY_HAS, BOLD_COMMAND_TOGGLE } from './bold.constants';

export const isBoldActive = createToggleMarkIsActive(BOLD_QUERY_HAS);

export const boldToggle = createToggleMarkToggle(BOLD_COMMAND_TOGGLE);
