import { createHighlight } from '@artibox/slate-common/highlight';
import { createReactToggleMarkCreator } from '../toggle-mark';
import { defaultRenderHighlight } from './defaultRenderHighlight';
import { HIGHLIGHT_HOTKEY } from './constants';

export const createReactHighlight = createReactToggleMarkCreator(createHighlight, {
  hotkey: HIGHLIGHT_HOTKEY,
  render: defaultRenderHighlight
});
