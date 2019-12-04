import { Block } from 'slate';
import { FacebookEmbedData } from '../typings';

export function createFacebookBlock(type: string, data: FacebookEmbedData) {
  return Block.fromJSON({ type, data });
}
