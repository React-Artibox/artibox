import { Block } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { INSTAGRAM_TYPE } from './constants';
import { InstagramProps } from './types';
import { getInstagramPropsFromBlock } from './utils/get-instagram-props-from-block';
import Instagram from './components/instagram';

export type CreateInstagramJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<Block, InstagramProps>, 'type' | 'component'>
>;

export function createInstagramJsxSerializerRule(config?: CreateInstagramJsxSerializerRuleConfig) {
  const { type = INSTAGRAM_TYPE, component = Instagram } = config || {};
  return createJsxSerializerRule<Block, InstagramProps>({
    type,
    component,
    getProps: getInstagramPropsFromBlock,
    isVoid: true
  });
}
