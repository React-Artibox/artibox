import { Editor } from 'slate';

export type ToggleMarkQueryHas = (editor: Editor) => boolean;

export interface ToggleMarkQueriesConfig {
  type: string;
  queryHas: string;
}

export interface ToggleMarkQueries {
  [q: string]: ToggleMarkQueryHas;
}

export function ToggleMarkQueries(config: ToggleMarkQueriesConfig): ToggleMarkQueries {
  const { type, queryHas } = config;
  /**
   * @todo
   * Refactor to `optional chaning` and `nullish coalescing operator` while `typescript@3.7.1` released.
   */
  return {
    [queryHas]: editor => editor.value.activeMarks.some(mark => (mark && mark.type) === type)
  };
}
