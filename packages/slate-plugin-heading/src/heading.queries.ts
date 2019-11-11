import { Editor, Plugin } from 'slate';
import { HEADING_LEVELS, HEADING_QUERY_HAS, HEADING_QUERY_LEVEL } from './heading.constants';
import { getLevelFromBlock } from './heading.utils';

/**
 * To query if the focused block is the specific level heading.
 */
export type HeadingQueryHas = (editor: Editor, level: HEADING_LEVELS) => boolean;

/**
 * To query the heading level of the focused block.
 *
 * @returns Will be number if the focused block is heading, or undefined.
 */
export type HeadingQueryLevel = (editor: Editor) => HEADING_LEVELS | undefined;

export type HeadingQueries = Plugin['queries'] & {
  [HEADING_QUERY_HAS]: HeadingQueryHas;
  [HEADING_QUERY_LEVEL]: HeadingQueryLevel;
};

export function HeadingQueries(type: string): HeadingQueries {
  return {
    [HEADING_QUERY_HAS]: (editor, level) =>
      editor.value.blocks.some(block => block?.type === type && getLevelFromBlock(block) === level),
    [HEADING_QUERY_LEVEL]: editor => {
      const currentBlock = editor.value.startBlock;

      if (currentBlock.type !== type) {
        return undefined;
      }

      const level = getLevelFromBlock(currentBlock);

      if (typeof level === 'number') {
        return level as HEADING_LEVELS;
      }

      return undefined;
    }
  };
}
