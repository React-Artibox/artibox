import { Plugin } from 'slate-react';
import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { getImagePropsFromBlock } from './utils/get-image-props-from-block';
import { WithHostingResolvers, ImagePropsForRenderer, WithThresholds } from './typings';
import { ImageController } from './controller';

export interface CreateImageRendererConfig
  extends Pick<CreateCommonBlockRendererConfig<ImagePropsForRenderer>, 'type' | 'component'>,
    Partial<WithHostingResolvers & WithThresholds> {
  controller: ImageController;
}

export function createImageRenderer(config: CreateImageRendererConfig): Plugin {
  const { type, component, controller, hostingResolvers, thresholds } = config;
  return createCommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: (props, editor) => ({
      ...getImagePropsFromBlock(props.node, hostingResolvers),
      controller,
      editor,
      node: props.node,
      isSelected: props.isFocused && props.isSelected,
      thresholds
    })
  });
}
