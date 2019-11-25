import { createToggleMark } from '@artibox/slate-toggle-mark';
import { STRIKETHROUGH_TYPE, STRIKETHROUGH_HOTKEY, STRIKETHROUGH_COMPONENT } from './strikethrough.constants';

export const {
  Core: Strikethrough,
  Handlers: StrikethroughHandlers,
  Renderer: StrikethroughRenderer
} = createToggleMark({
  type: STRIKETHROUGH_TYPE,
  hotkey: STRIKETHROUGH_HOTKEY,
  component: STRIKETHROUGH_COMPONENT
});
