import { createToggleMark } from '@artibox/slate-toggle-mark';
import { UNDERLINE_TYPE, UNDERLINE_HOTKEY, UNDERLINE_COMPONENT } from './underline.constants';

export const { Core: Underline, Handlers: UnderlineHandlers, Renderer: UnderlineRenderer } = createToggleMark({
  type: UNDERLINE_TYPE,
  hotkey: UNDERLINE_HOTKEY,
  component: UNDERLINE_COMPONENT
});
