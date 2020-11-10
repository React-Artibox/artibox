import { UNDERLINE_TYPE } from '@artibox/slate-common/underline/common';
import { createJsxSerializeToggleMarkCreator } from '../../toggle-mark/jsx-serializer';
import { defaultRenderUnderline } from '../defaultRenderUnderline';

export const createJsxSerializeUnderline = createJsxSerializeToggleMarkCreator({
  type: UNDERLINE_TYPE,
  render: defaultRenderUnderline
});
