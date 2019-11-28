import { Block } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { SEPARATION_LINE_TYPE, SEPARATION_LINE_COMPONENT } from './constants';

export type CreateSeparationLineJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<Block>, 'type' | 'component'>
>;

export function createSeparationLineJsxSerializerRule(config?: CreateSeparationLineJsxSerializerRuleConfig) {
  const { type = SEPARATION_LINE_TYPE, component = SEPARATION_LINE_COMPONENT } = config || {};
  return createJsxSerializerRule<Block>({ type, component, isVoid: true });
}
