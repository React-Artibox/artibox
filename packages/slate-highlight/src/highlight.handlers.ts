import { createToggleMarkHandlers } from '@artibox/slate-toggle-mark';
import { HIGHLIGHT_HOTKEY } from './highlight.constants';

export const HighlightHandlers = createToggleMarkHandlers({ hotkey: HIGHLIGHT_HOTKEY });
