import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/jsx-serializer';
import { ITALIC_TYPE, ITALIC_COMPONENT } from './constants';

export const createItalicJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: ITALIC_TYPE,
  component: ITALIC_COMPONENT
});
