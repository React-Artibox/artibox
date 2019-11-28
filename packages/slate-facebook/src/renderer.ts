import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { FACEBOOK_TYPE } from './constants';
import { getFacebookEmbedDataFromBlock } from './utils/get-facebook-embed-data-from-block';
import { FacebookProps } from './types';
import Facebook from './components/facebook';

export type CreateFacebookRendererConfig = Partial<
  Pick<CreateCommonBlockRendererConfig<FacebookProps>, 'type' | 'component'>
>;

export function createFacebookRenderer(config?: CreateFacebookRendererConfig) {
  const { type = FACEBOOK_TYPE, component = Facebook } = config || {};

  return createCommonBlockRenderer({
    type,
    component,
    isVoid: true,
    getProps: props => getFacebookEmbedDataFromBlock(props.node)
  });
}
