import { Inline, InlineJSON } from 'slate';
import { getNodeDataByKey } from '@artibox/slate-common/utils/get-node-data-by-key';

export function getLinkUrlFromInline(inline: Inline | InlineJSON): string | undefined {
  return getNodeDataByKey(inline, 'href');
}
