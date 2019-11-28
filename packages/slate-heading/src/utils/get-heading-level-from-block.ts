import { Block } from 'slate';
import { HeadingLevel } from '../types';

export function getHeadingLevelFromBlock(block: Block): HeadingLevel | undefined {
  return block?.data.get('level');
}
