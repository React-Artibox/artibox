import { Inline, InlineJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common';
import { HostingResolvers } from '../typings';

function isHostingNotRequired(src: string) {
  return /^https?:\/\/.*/.test(src) || src.startsWith('data:image');
}

export function getImageSrcFromInline(inline: Inline | InlineJSON, hostingResolvers?: HostingResolvers): string {
  const src: string = getNodeDataByKey(inline, 'src') || '';

  if (isHostingNotRequired(src) || !hostingResolvers) {
    return src;
  }

  const hostingType = getNodeDataByKey(inline, 'hostingType');
  const hostingResolver = hostingResolvers[hostingType];
  return hostingResolver ? hostingResolver(src || '') : src;
}
