import { BlockJSON } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { FACEBOOK_TYPE } from './constants';
import { getFacebookEmbedDataFromBlock } from './utils/get-facebook-embed-data-from-block';
import { FacebookProps } from './typings';
import Facebook from './components/facebook';

export type CreateFacebookJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<BlockJSON, FacebookProps>, 'type' | 'component'>
>;

export function createFacebookJsxSerializerRule(config?: CreateFacebookJsxSerializerRuleConfig) {
  const { type = FACEBOOK_TYPE, component = Facebook } = config || {};
  return createJsxSerializerRule<BlockJSON, FacebookProps>({
    type,
    component,
    getProps: getFacebookEmbedDataFromBlock,
    isVoid: true
  });
}
