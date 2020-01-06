import { Block, BlockJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common';
import { HostingResolvers } from '../typings';

function isHostingNotRequired(src: string) {
  return /^https?:\/\/.*/.test(src) || src.startsWith('data:image');
}

export function getImageSrcFromBlock(block: Block | BlockJSON, hostingResolvers?: HostingResolvers): string {
  const src: string = getNodeDataByKey(block, 'src') || '';

  if (isHostingNotRequired(src) || !hostingResolvers) {
    return src;
  }

  const hostingType = getNodeDataByKey(block, 'hostingType');
  const hostingResolver = hostingResolvers[hostingType];
  return hostingResolver ? hostingResolver(src || '') : src;
}
