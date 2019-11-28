import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/jsx-serializer';
import { UNDERLINE_TYPE, UNDERLINE_COMPONENT } from './constants';

export const createUnderlineJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: UNDERLINE_TYPE,
  component: UNDERLINE_COMPONENT
});
