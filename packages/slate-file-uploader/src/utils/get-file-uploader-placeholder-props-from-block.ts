import { Block } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common/utils/get-node-data-by-key';

export function getFileUploaderPlaceholderPropsFromBlock(block: Block) {
  return { percentage: getNodeDataByKey(block, 'percentage') };
}
