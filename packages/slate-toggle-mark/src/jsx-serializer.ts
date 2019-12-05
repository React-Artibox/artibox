import { MarkJSON } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';

export type CreateToggleMarkJsxSerializerDefaultConfig = Pick<
  CreateJsxSerializerRuleConfig<MarkJSON>,
  'type' | 'component'
>;

export type CreateToggleMarkJsxSerializerRuleConfig = Partial<CreateToggleMarkJsxSerializerDefaultConfig>;

export function createToggleMarkJsxSerializerRuleCreator(defaults: CreateToggleMarkJsxSerializerDefaultConfig) {
  function createToggleMarkJsxSerializerRule(config?: CreateToggleMarkJsxSerializerRuleConfig) {
    const { type = defaults.type, component = defaults.component } = config || {};
    return createJsxSerializerRule<MarkJSON>({ type, component });
  }

  return createToggleMarkJsxSerializerRule;
}
