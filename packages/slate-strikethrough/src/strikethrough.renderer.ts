import { createToggleMarkRenderer } from '@artibox/slate-toggle-mark';
import { STRIKETHROUGH_TYPE, STRIKETHROUGH_COMPONENT } from './strikethrough.constants';

export const StrikethroughRenderer = createToggleMarkRenderer({
  type: STRIKETHROUGH_TYPE,
  component: STRIKETHROUGH_COMPONENT
});
