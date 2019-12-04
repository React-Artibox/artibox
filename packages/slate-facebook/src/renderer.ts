import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { getFacebookEmbedDataFromBlock } from './utils/get-facebook-embed-data-from-block';
import { FacebookProps } from './typings';

export type CreateFacebookRendererConfig = Pick<CreateCommonBlockRendererConfig<FacebookProps>, 'type' | 'component'>;

export function createFacebookRenderer(config: CreateFacebookRendererConfig) {
  const { type, component } = config;
  return createCommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => getFacebookEmbedDataFromBlock(props.node)
  });
}
