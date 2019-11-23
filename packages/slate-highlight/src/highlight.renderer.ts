import { createToggleMarkRenderer } from '@artibox/slate-toggle-mark';
import { HIGHLIGHT_TYPE, HIGHLIGHT_COMPONENT } from './highlight.constants';

export const HighlightRenderer = createToggleMarkRenderer({ type: HIGHLIGHT_TYPE, component: HIGHLIGHT_COMPONENT });
