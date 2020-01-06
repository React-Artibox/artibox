import { Block, BlockJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common';
import { ImageStyle } from '../typings';

function addPercentage(size?: number) {
  return typeof size === 'number' ? `${size}%` : size;
}

export function getImageStyleFromBlock(block: Block | BlockJSON): ImageStyle {
  return {
    width: addPercentage(getNodeDataByKey(block, 'width'))
  };
}
