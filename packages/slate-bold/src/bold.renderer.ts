import { createToggleMarkRenderer } from '@artibox/slate-toggle-mark';
import { BOLD_TYPE, BOLD_COMPONENT } from './bold.constants';

export const BoldRenderer = createToggleMarkRenderer({ type: BOLD_TYPE, component: BOLD_COMPONENT });
