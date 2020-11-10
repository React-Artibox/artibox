import { createBold } from '@artibox/slate-common/bold';
import { createReactToggleMarkCreator } from '../toggle-mark';
import { BOLD_HOTKEY } from './constants';
import { defaultRenderBold } from './defaultRenderBold';

export const createReactBold = createReactToggleMarkCreator(createBold, {
  hotkey: BOLD_HOTKEY,
  render: defaultRenderBold
});
