import { createToggleMarkIsActive, createToggleMarkToggle } from '@artibox/slate-plugin-toggle-mark';
import { HIGHLIGHT_QUERY_HAS, HIGHLIGHT_COMMAND_TOGGLE } from './highlight.constants';

export const isHighlightActive = createToggleMarkIsActive(HIGHLIGHT_QUERY_HAS);

export const highlightToggle = createToggleMarkToggle(HIGHLIGHT_COMMAND_TOGGLE);
