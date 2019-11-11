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
  return {
    [queryHas]: editor => editor.value.activeMarks.some(mark => mark?.type === type)
  };
}
