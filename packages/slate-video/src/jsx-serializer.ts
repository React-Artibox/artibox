import { Block } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { VIDEO_TYPE } from './constants';
import { getVideoPropsFromBlock } from './utils/get-video-props-from-block';
import { VideoProps } from './typings';
import Video from './components/video';

export type CreateVideoJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<Block, VideoProps>, 'type' | 'component'>
>;

export function createVideoJsxSerializerRule(config?: CreateVideoJsxSerializerRuleConfig) {
  const { type = VIDEO_TYPE, component = Video } = config || {};
  return createJsxSerializerRule<Block, VideoProps>({
    type,
    component,
    getProps: getVideoPropsFromBlock,
    isVoid: true
  });
}
