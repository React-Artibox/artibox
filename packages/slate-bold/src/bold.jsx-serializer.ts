import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark/toggle-mark.jsx-serializer';
import { BOLD_TYPE, BOLD_COMPONENT } from './bold.constants';

export const createBoldJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: BOLD_TYPE,
  component: BOLD_COMPONENT
});
