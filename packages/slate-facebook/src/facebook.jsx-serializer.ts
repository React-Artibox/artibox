import { Block } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { FACEBOOK_TYPE } from './facebook.constants';
import { getFacebookEmbedDataFromBlock } from './facebook.utils';
import Facebook, { FacebookProps } from './facebook.component';

export type CreateFacebookJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<Block, FacebookProps>, 'type' | 'component'>
>;

export function createFacebookJsxSerializerRule(config?: CreateFacebookJsxSerializerRuleConfig) {
  const { type = FACEBOOK_TYPE, component = Facebook } = config || {};
  return createJsxSerializerRule<Block, FacebookProps>({
    type,
    component,
    getProps: getFacebookEmbedDataFromBlock,
    isVoid: true
  });
}
