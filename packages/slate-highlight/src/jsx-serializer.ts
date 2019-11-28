import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/jsx-serializer';
import { HIGHLIGHT_TYPE, HIGHLIGHT_COMPONENT } from './constants';

export const createHighlightJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: HIGHLIGHT_TYPE,
  component: HIGHLIGHT_COMPONENT
});
