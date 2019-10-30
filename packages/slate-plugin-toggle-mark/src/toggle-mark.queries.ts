import { Queries } from '@artibox/slate-core';

export interface ToggleMarkQueriesConfig<QS> {
  type: string;
  queryHas: QS;
}

export function ToggleMarkQueries<QS>(config: ToggleMarkQueriesConfig<QS>): Queries<QS> {
  const { type, queryHas } = config;
  return new Queries<QS>([[queryHas, editor => editor.value.activeMarks.some(mark => (mark && mark.type) === type)]]);
}
