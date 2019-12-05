import { Block, BlockJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common/utils/get-node-data-by-key';
import { VideoProps } from '../typings';

export function getVideoPropsFromBlock(block: Block | BlockJSON): VideoProps {
  const provider = getNodeDataByKey(block, 'provider');
  const id = getNodeDataByKey(block, provider);
  return { id, provider };
}
