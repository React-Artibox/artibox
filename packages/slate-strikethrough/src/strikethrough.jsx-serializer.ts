import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/toggle-mark.jsx-serializer';
import { STRIKETHROUGH_TYPE, STRIKETHROUGH_COMPONENT } from './strikethrough.constants';

export const createStrikethroughJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: STRIKETHROUGH_TYPE,
  component: STRIKETHROUGH_COMPONENT
});
