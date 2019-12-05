import { Block, BlockJSON } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_COMPONENT } from './constants';

export type CreateBlockquoteJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<Block>, 'type' | 'component'>
>;

export function createBlockquoteJsxSerializerRule(config?: CreateBlockquoteJsxSerializerRuleConfig) {
  const { type = BLOCKQUOTE_TYPE, component = BLOCKQUOTE_COMPONENT } = config || {};
  return createJsxSerializerRule<BlockJSON>({ type, component });
}
