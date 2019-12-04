import { Block } from 'slate';
import { VideoSourceSerializeResult } from '../source-serializers';

export function createVideoBlock(type: string, { provider, id }: VideoSourceSerializeResult): Block {
  return Block.fromJSON({ type, data: { provider, [provider]: id } });
}
