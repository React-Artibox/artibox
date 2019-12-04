import { Block } from 'slate';
import { InstagramProps } from '../typings';

export function getInstagramPropsFromBlock(block: Block): InstagramProps {
  return { url: block.data.get('url') || '' };
}
