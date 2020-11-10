import { createUnderline } from '@artibox/slate-common/underline';
import { createReactToggleMarkCreator } from '../toggle-mark';
import { defaultRenderUnderline } from './defaultRenderUnderline';
import { UNDERLINE_HOTKEY } from './constants';

export const createReactUnderline = createReactToggleMarkCreator(createUnderline, {
  hotkey: UNDERLINE_HOTKEY,
  render: defaultRenderUnderline
});
