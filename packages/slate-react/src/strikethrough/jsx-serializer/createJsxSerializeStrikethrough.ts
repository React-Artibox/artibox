import { STRIKETHROUGH_TYPE } from '@artibox/slate-common/strikethrough/common';
import { createJsxSerializeToggleMarkCreator } from '../../toggle-mark/jsx-serializer';
import { defaultRenderStrikethrough } from '../defaultRenderStrikethrough';

export const createJsxSerializeStrikethrough = createJsxSerializeToggleMarkCreator({
  type: STRIKETHROUGH_TYPE,
  render: defaultRenderStrikethrough
});
