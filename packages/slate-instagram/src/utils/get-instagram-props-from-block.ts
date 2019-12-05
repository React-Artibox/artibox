import { Block, BlockJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common/utils/get-node-data-by-key';
import { InstagramProps } from '../typings';

export function getInstagramPropsFromBlock(block: Block | BlockJSON): InstagramProps {
  return { url: getNodeDataByKey(block, 'url') || '' };
}
