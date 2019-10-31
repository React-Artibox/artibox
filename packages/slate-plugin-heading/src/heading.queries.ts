import { Editor } from 'slate';

export interface HeadingQueriesConfig<QS extends string> {
  type: string;
  queryHas: QS;
}

export type HeadingQueryHas = (editor: Editor) => boolean;

export type HeadingQueries<Q extends string> = {
  [q in Q]: HeadingQueryHas;
};

export function HeadingQueries<QS extends string>(config: HeadingQueriesConfig<QS>): HeadingQueries<QS> {
  const { type, queryHas } = config;
  const queries = {} as HeadingQueries<QS>;
  /**
   * @todo
   * Refactor to `optional chaning` and `nullish coalescing operator` while `typescript@3.7.1` released.
   */
  queries[queryHas] = editor => editor.value.blocks.some(block => (block && block.type) === type);

  return queries;
}
