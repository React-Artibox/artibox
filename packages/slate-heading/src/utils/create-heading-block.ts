import { Block } from 'slate';
import { HeadingLevel } from '../typings';

export function createHeadingBlock(type: string, level: HeadingLevel) {
  return Block.fromJSON({ type, data: { level } });
}
