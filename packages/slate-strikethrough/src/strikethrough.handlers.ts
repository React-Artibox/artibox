import { createToggleMarkHandlers } from '@artibox/slate-toggle-mark';
import { STRIKETHROUGH_HOTKEY } from './strikethrough.constants';

export const StrikethroughHandlers = createToggleMarkHandlers({ hotkey: STRIKETHROUGH_HOTKEY });
