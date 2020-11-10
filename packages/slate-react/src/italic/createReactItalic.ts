import { createItalic } from '@artibox/slate-common/italic';
import { createReactToggleMarkCreator } from '../toggle-mark';
import { defaultRenderItalic } from './defaultRenderItalic';
import { ITALIC_HOTKEY } from './constants';

export const createReactItalic = createReactToggleMarkCreator(createItalic, {
  hotkey: ITALIC_HOTKEY,
  render: defaultRenderItalic
});
