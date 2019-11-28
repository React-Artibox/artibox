import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/toggle-mark.jsx-serializer';
import { UNDERLINE_TYPE, UNDERLINE_COMPONENT } from './underline.constants';

export const createUnderlineJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: UNDERLINE_TYPE,
  component: UNDERLINE_COMPONENT
});
