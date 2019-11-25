import { createToggleMark } from '@artibox/slate-toggle-mark';
import { BOLD_TYPE, BOLD_HOTKEY, BOLD_COMPONENT } from './bold.constants';

export const { Core: Bold, Handlers: BoldHandlers, Renderer: BoldRenderer } = createToggleMark({
  type: BOLD_TYPE,
  hotkey: BOLD_HOTKEY,
  component: BOLD_COMPONENT
});
