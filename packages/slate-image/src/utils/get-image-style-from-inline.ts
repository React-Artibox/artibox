import { Inline, InlineJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common';
import { ImageStyle } from '../typings';

function addPercentage(size?: number) {
  return typeof size === 'number' ? `${size}%` : size;
}

export function getImageStyleFromInline(inline: Inline | InlineJSON): ImageStyle {
  return {
    width: addPercentage(getNodeDataByKey(inline, 'width'))
  };
}
