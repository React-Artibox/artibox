import { Block } from 'slate';
import { VideoProps } from '../types';
import { getVideoSourceFromBlock } from './get-video-source-from-block';

export function getVideoPropsFromBlock(block: Block): VideoProps {
  return { src: getVideoSourceFromBlock(block) || '' };
}
