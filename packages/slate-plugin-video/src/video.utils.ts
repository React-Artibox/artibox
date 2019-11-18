import { Block, Data } from 'slate';
import { getCommand } from '@artibox/slate-core';
import {
  VIDEO_DATA_KEY_PROVIDER,
  VIDEO_PROVIDERS,
  VIDEO_COMMAND_ADD,
  youtubeTemplate,
  youtubeReg,
  youtubeEmbedReg,
  youtubeEmbedTemplate
} from './video.constants';
import { VideoCommandAdd } from './video.commands';

function getYoutubeId(src: string, reg: RegExp) {
  const result = reg.exec(src);
  return result ? result[1] : src;
}

export type VideoSourceSerializers = {
  [p in VIDEO_PROVIDERS]: {
    serialize: (src: string) => string;
    deserialize: (src: string) => string;
  };
};

export const videoSerializers: VideoSourceSerializers = {
  youtube: {
    serialize: src => youtubeEmbedTemplate.replace('{{id}}', getYoutubeId(src, youtubeReg)),
    deserialize: src => youtubeTemplate.replace('{{id}}', getYoutubeId(src, youtubeEmbedReg))
  }
};

export function getSourceFromBlock(block: Block): string | undefined {
  return block.data.get(block.data.get(VIDEO_DATA_KEY_PROVIDER));
}

export function createVideoBlock(type: string, src: string, provider: VIDEO_PROVIDERS): Block {
  return Block.fromJSON({
    type,
    data: Data.fromJSON({
      [VIDEO_DATA_KEY_PROVIDER]: provider,
      [provider]: videoSerializers[provider].serialize(src)
    })
  });
}

/**
 * @public
 */
export const videoAdd: VideoCommandAdd = (editor, src, provider) =>
  getCommand<VideoCommandAdd>(editor, VIDEO_COMMAND_ADD)(src, provider);
