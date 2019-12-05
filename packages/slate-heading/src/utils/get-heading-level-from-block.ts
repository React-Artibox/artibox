import { Block, BlockJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common/utils/get-node-data-by-key';
import { HeadingLevel } from '../typings';

export function getHeadingLevelFromBlock(block: Block | BlockJSON): HeadingLevel | undefined {
  return getNodeDataByKey(block, 'level');
}
