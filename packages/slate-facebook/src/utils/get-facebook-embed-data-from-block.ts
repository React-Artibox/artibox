import { Block, BlockJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common/utils/get-node-data-by-key';
import { FacebookEmbedData } from '../typings';

export function getFacebookEmbedDataFromBlock(block: Block | BlockJSON): FacebookEmbedData {
  return {
    type: getNodeDataByKey(block, 'type'),
    url: getNodeDataByKey(block, 'url'),
    width: getNodeDataByKey(block, 'width'),
    height: getNodeDataByKey(block, 'height')
  };
}
