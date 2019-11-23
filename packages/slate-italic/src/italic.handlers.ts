import { createToggleMarkHandlers } from '@artibox/slate-toggle-mark';
import { ITALIC_HOTKEY } from './italic.constants';

export const ItalicHandlers = createToggleMarkHandlers({ hotkey: ITALIC_HOTKEY });
