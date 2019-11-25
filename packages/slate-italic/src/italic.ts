import { createToggleMark } from '@artibox/slate-toggle-mark';
import { ITALIC_TYPE, ITALIC_HOTKEY, ITALIC_COMPONENT } from './italic.constants';

export const { Core: Italic, Handlers: ItalicHandlers, Renderer: ItalicRenderer } = createToggleMark({
  type: ITALIC_TYPE,
  hotkey: ITALIC_HOTKEY,
  component: ITALIC_COMPONENT
});
