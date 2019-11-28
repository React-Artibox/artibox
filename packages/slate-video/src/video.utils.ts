import { Block } from 'slate';
import { VIDEO_DATA_KEY_PROVIDER } from './video.constants';
import { VideoProps } from './video.component';

export function getVideoSourceFromBlock(block: Block): string | undefined {
  return block.data.get(block.data.get(VIDEO_DATA_KEY_PROVIDER));
}

export function getVideoPropsFromBlock(block: Block): VideoProps {
  return { src: getVideoSourceFromBlock(block) || '' };
}
