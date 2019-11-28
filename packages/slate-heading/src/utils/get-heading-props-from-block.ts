import { Block } from 'slate';
import { HeadingProps } from '../types';
import { getHeadingLevelFromBlock } from './get-heading-level-from-block';

export function getHeadingPropsFromBlock(block: Block): HeadingProps {
  return { level: getHeadingLevelFromBlock(block) };
}
