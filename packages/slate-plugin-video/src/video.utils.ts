import { Block, Data } from 'slate';
import { getCommand } from '@artibox/slate-core';
import { VIDEO_DATA_KEY_PROVIDER, VIDEO_COMMAND_ADD } from './video.constants';
import { VideoSerializeResult } from './video.serializers';
import { VideoCommandAdd } from './video.commands';

export function getSourceFromBlock(block: Block): string | undefined {
  return block.data.get(block.data.get(VIDEO_DATA_KEY_PROVIDER));
}

export function createVideoBlock(type: string, result: VideoSerializeResult): Block {
  const { provider, src } = result;

  return Block.fromJSON({
    type,
    data: Data.fromJSON({
      [VIDEO_DATA_KEY_PROVIDER]: provider,
      [provider]: src
    })
  });
}

/**
 * @public
 */
export const videoAdd: VideoCommandAdd = (editor, src) => getCommand<VideoCommandAdd>(editor, VIDEO_COMMAND_ADD)(src);
