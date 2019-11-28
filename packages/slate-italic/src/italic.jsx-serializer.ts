import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/toggle-mark.jsx-serializer';
import { ITALIC_TYPE, ITALIC_COMPONENT } from './italic.constants';

export const createItalicJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: ITALIC_TYPE,
  component: ITALIC_COMPONENT
});
