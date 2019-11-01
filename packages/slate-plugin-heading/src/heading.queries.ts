import { Editor, Plugin } from 'slate';
import { HEADING_LEVELS, HEADING_QUERY_HAS, HEADING_QUERY_LEVEL } from './heading.constants';
import { getLevelFromBlock } from './heading.utils';

export type HeadingQueryHas = (editor: Editor, level: HEADING_LEVELS) => boolean;
export type HeadingQueryLevel = (editor: Editor) => HEADING_LEVELS | undefined;

export type HeadingQueries = Plugin['queries'] & {
  [HEADING_QUERY_HAS]: HeadingQueryHas;
  [HEADING_QUERY_LEVEL]: HeadingQueryLevel;
};

export function HeadingQueries(type: string): HeadingQueries {
  const queries = {} as HeadingQueries;
  /**
   * @todo
   * Refactor to `optional chaning` and `nullish coalescing operator` while `typescript@3.7.1` released.
   * Be type friendly to `immutable`.
   */
  queries[HEADING_QUERY_HAS] = (editor, level) =>
    editor.value.blocks.some(block => !!block && block.type === type && getLevelFromBlock(block) === level);
  queries[HEADING_QUERY_LEVEL] = editor => {
    const currentBlock = editor.value.startBlock;

    if (currentBlock.type !== type) {
      return undefined;
    }

    const level = getLevelFromBlock(currentBlock);

    if (typeof level === 'number') {
      return level as HEADING_LEVELS;
    }

    return undefined;
  };

  return queries;
}
