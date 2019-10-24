import { QueryFunc } from 'slate';
import { Queries } from '@artibox/slate-core';

export interface ToggleMarkQueriesConfig<QS extends string> {
  type: string;
  queryHas: QS;
}

export type ToggleMarkQueries<QS extends string> = Queries<QS>;

export function ToggleMarkQueries<QS extends string>(config: ToggleMarkQueriesConfig<QS>): ToggleMarkQueries<QS> {
  const { type, queryHas } = config;

  const hasMark: QueryFunc = editor => editor.value.activeMarks.some(mark => (mark && mark.type) === type);

  return {
    [queryHas]: hasMark
  } as ToggleMarkQueries<QS>;
}
