import { BlockJSON } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { IMAGE_FIGURE_TYPE, IMAGE_TYPE, IMAGE_CAPTION_TYPE } from './constants';
import { ImageProps, WithHostingResolvers } from './typings';
import { getImagePropsFromBlock } from './utils/get-image-props-from-block';

export interface CreateImageJsxSerializerRulesConfig extends Partial<WithHostingResolvers> {
  figure?: Partial<Pick<CreateJsxSerializerRuleConfig<BlockJSON>, 'type' | 'component'>>;
  image?: Partial<Pick<CreateJsxSerializerRuleConfig<BlockJSON, ImageProps>, 'type' | 'component'>>;
  caption?: Partial<Pick<CreateJsxSerializerRuleConfig<BlockJSON>, 'type' | 'component'>>;
}

export function createImageJsxSerializerRules(config?: CreateImageJsxSerializerRulesConfig) {
  const { figure, image, caption, hostingResolvers } = config || {};
  return [
    createJsxSerializerRule<BlockJSON>({
      type: figure?.type || IMAGE_FIGURE_TYPE,
      component: figure?.component || 'div'
    }),
    createJsxSerializerRule<BlockJSON, ImageProps>({
      type: image?.type || IMAGE_TYPE,
      component: image?.component || 'img',
      isVoid: true,
      getProps: block => getImagePropsFromBlock(block, hostingResolvers)
    }),
    createJsxSerializerRule<BlockJSON>({
      type: caption?.type || IMAGE_CAPTION_TYPE,
      component: caption?.component || 'div'
    })
  ];
}
