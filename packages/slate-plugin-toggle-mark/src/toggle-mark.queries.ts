import { QueryFunc } from 'slate';

export interface ToggleMarkQueriesConfig<QS extends string> {
  type: string;
  queryHas: QS;
}

export type ToggleMarkQueries<QS extends string> = {
  [q in QS]: QueryFunc;
};

export function ToggleMarkQueries<QS extends string>(config: ToggleMarkQueriesConfig<QS>): ToggleMarkQueries<QS> {
  const { type, queryHas } = config;
  const queries = {} as ToggleMarkQueries<QS>;
  /**
   * @todo
   * Refactor to `optional chaning` and `nullish coalescing operator` while `typescript@3.7.1` released.
   */
  queries[queryHas] = editor => editor.value.activeMarks.some(mark => (mark && mark.type) === type);

  return queries;
}
