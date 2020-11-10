import { HIGHLIGHT_TYPE } from '@artibox/slate-common/highlight/common';
import { createJsxSerializeToggleMarkCreator } from '../../toggle-mark/jsx-serializer';
import { defaultRenderHighlight } from '../defaultRenderHighlight';

export const createJsxSerializeHighlight = createJsxSerializeToggleMarkCreator({
  type: HIGHLIGHT_TYPE,
  render: defaultRenderHighlight
});
