import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/toggle-mark.jsx-serializer';
import { HIGHLIGHT_TYPE, HIGHLIGHT_COMPONENT } from './highlight.constants';

export const createHighlightJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: HIGHLIGHT_TYPE,
  component: HIGHLIGHT_COMPONENT
});
