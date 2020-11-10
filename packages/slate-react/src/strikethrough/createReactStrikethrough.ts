import { createStrikethrough } from '@artibox/slate-common/strikethrough';
import { createReactToggleMarkCreator } from '../toggle-mark';
import { defaultRenderStrikethrough } from './defaultRenderStrikethrough';
import { STRIKETHROUGH_HOTKEY } from './constants';

export const createReactStrikethrough = createReactToggleMarkCreator(createStrikethrough, {
  hotkey: STRIKETHROUGH_HOTKEY,
  render: defaultRenderStrikethrough
});
