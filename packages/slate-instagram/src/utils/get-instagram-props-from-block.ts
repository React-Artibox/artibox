import { Block } from 'slate';
import { InstagramProps } from '../types';

export function getInstagramPropsFromBlock(block: Block): InstagramProps {
  return { url: block.data.get('url') || '' };
}
