import { Block } from 'slate';

export function createInstagramBlock(type: string, url: string) {
  return Block.fromJSON({ type, data: { url } });
}
