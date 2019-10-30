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

  queries[queryHas] = editor => editor.value.activeMarks.some(mark => (mark && mark.type) === type);

  return queries;
}
