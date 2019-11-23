import { createToggleMarkHandlers } from '@artibox/slate-toggle-mark';
import { UNDERLINE_HOTKEY } from './underline.constants';

export const UnderlineHandlers = createToggleMarkHandlers({ hotkey: UNDERLINE_HOTKEY });
