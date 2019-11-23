import { createToggleMarkHandlers } from '@artibox/slate-toggle-mark';
import { BOLD_HOTKEY } from './bold.constants';

export const BoldHandlers = createToggleMarkHandlers({ hotkey: BOLD_HOTKEY });
