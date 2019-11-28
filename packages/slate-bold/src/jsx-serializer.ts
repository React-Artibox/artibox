import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/jsx-serializer';
import { BOLD_TYPE, BOLD_COMPONENT } from './constants';

export const createBoldJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: BOLD_TYPE,
  component: BOLD_COMPONENT
});
