import { ITALIC_TYPE } from '@artibox/slate-common/italic/common';
import { createJsxSerializeToggleMarkCreator } from '../../toggle-mark/jsx-serializer';
import { defaultRenderItalic } from '../defaultRenderItalic';

export const createJsxSerializeItalic = createJsxSerializeToggleMarkCreator({
  type: ITALIC_TYPE,
  render: defaultRenderItalic
});
