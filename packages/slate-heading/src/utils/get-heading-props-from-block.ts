import { Block, BlockJSON } from 'slate';
import { HeadingProps } from '../typings';
import { getHeadingLevelFromBlock } from './get-heading-level-from-block';

export function getHeadingPropsFromBlock(block: Block | BlockJSON): HeadingProps {
  return { level: getHeadingLevelFromBlock(block) };
}
