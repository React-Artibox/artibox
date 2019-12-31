import { InlineJSON } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { IMAGE_TYPE } from './constants';
import { ImageProps, WithHostingResolvers } from './typings';
import { getImagePropsFromInline } from './utils/get-image-props-from-inline';

export type CreateImageJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<InlineJSON, ImageProps>, 'type' | 'component'>
> &
  WithHostingResolvers;

export function createImageJsxSerializerRule(config?: CreateImageJsxSerializerRuleConfig) {
  const { type = IMAGE_TYPE, component = 'img', hostingResolvers } = config || {};
  return createJsxSerializerRule<InlineJSON, ImageProps>({
    type,
    component,
    isVoid: true,
    getProps: inline => getImagePropsFromInline(inline, hostingResolvers)
  });
}
