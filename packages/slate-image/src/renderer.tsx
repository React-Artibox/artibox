import { Plugin } from 'slate-react';
import {
  CreateCommonInlineRendererConfig,
  createCommonInlineRenderer
} from '@artibox/slate-common/renderers/common-inline';
import { getImagePropsFromInline } from './utils/get-image-props-from-inline';
import { WithHostingResolvers, ImagePropsForRenderer, WithThresholds } from './typings';
import { ImageController } from './controller';

export interface CreateImageRendererConfig
  extends Pick<CreateCommonInlineRendererConfig<ImagePropsForRenderer>, 'type' | 'component'>,
    Partial<WithHostingResolvers & WithThresholds> {
  controller: ImageController;
}

export function createImageRenderer(config: CreateImageRendererConfig): Plugin {
  const { type, component, controller, hostingResolvers, thresholds } = config;
  return createCommonInlineRenderer({
    type,
    component,
    isVoid: true,
    getProps: (props, editor) => ({
      ...getImagePropsFromInline(props.node, hostingResolvers),
      controller,
      editor,
      isSelected: props.isFocused && props.isSelected,
      thresholds
    })
  });
}
