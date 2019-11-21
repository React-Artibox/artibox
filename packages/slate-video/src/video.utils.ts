import { Block } from 'slate';
import { VIDEO_DATA_KEY_PROVIDER } from './video.constants';

export function getSourceFromBlock(block: Block): string | undefined {
  return block.data.get(block.data.get(VIDEO_DATA_KEY_PROVIDER));
}
