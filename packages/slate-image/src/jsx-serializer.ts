import { BlockJSON } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { IMAGE_TYPE } from './constants';
import { ImageProps, WithHostingResolvers } from './typings';
import { getImagePropsFromBlock } from './utils/get-image-props-from-block';

export type CreateImageJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<BlockJSON, ImageProps>, 'type' | 'component'>
> &
  WithHostingResolvers;

export function createImageJsxSerializerRule(config?: CreateImageJsxSerializerRuleConfig) {
  const { type = IMAGE_TYPE, component = 'img', hostingResolvers } = config || {};
  return createJsxSerializerRule<BlockJSON, ImageProps>({
    type,
    component,
    isVoid: true,
    getProps: block => getImagePropsFromBlock(block, hostingResolvers)
  });
}
