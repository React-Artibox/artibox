import { createToggleMarkRenderer } from '@artibox/slate-toggle-mark';
import { ITALIC_TYPE, ITALIC_COMPONENT } from './italic.constants';

export const ItalicRenderer = createToggleMarkRenderer({ type: ITALIC_TYPE, component: ITALIC_COMPONENT });
