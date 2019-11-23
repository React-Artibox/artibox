import { createToggleMarkRenderer } from '@artibox/slate-toggle-mark';
import { UNDERLINE_TYPE, UNDERLINE_COMPONENT } from './underline.constants';

export const UnderlineRenderer = createToggleMarkRenderer({ type: UNDERLINE_TYPE, component: UNDERLINE_COMPONENT });
