import { createToggleMark } from '@artibox/slate-toggle-mark';
import { HIGHLIGHT_TYPE, HIGHLIGHT_HOTKEY, HIGHLIGHT_COMPONENT } from './highlight.constants';

export const { Core: Highlight, Handlers: HighlightHandlers, Renderer: HighlightRenderer } = createToggleMark({
  type: HIGHLIGHT_TYPE,
  hotkey: HIGHLIGHT_HOTKEY,
  component: HIGHLIGHT_COMPONENT
});
