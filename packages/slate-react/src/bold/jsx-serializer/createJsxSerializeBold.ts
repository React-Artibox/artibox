import { BOLD_TYPE } from '@artibox/slate-common/bold/common';
import { createJsxSerializeToggleMarkCreator } from '../../toggle-mark/jsx-serializer';
import { defaultRenderBold } from '../defaultRenderBold';

export const createJsxSerializeBold = createJsxSerializeToggleMarkCreator({
  type: BOLD_TYPE,
  render: defaultRenderBold
});
