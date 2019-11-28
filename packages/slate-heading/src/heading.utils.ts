import { Block } from 'slate';
import { HEADING_DATA_KEY_LEVEL } from './heading.constants';
import { HeadingLevel, HeadingProps } from './heading.types';

export function getHeadingLevelFromBlock(block: Block): HeadingLevel | undefined {
  return block?.data.get(HEADING_DATA_KEY_LEVEL);
}

export function getHeadingPropsFromBlock(block: Block): HeadingProps {
  return { level: getHeadingLevelFromBlock(block) };
}
