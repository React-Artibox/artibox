import { Editor, QueryFunc } from 'slate';

export function hasQuery(editor: Editor, queryName: string) {
  return queryName in editor;
}

export function getQuery<F extends (...args: any[]) => any>(editor: Editor, query: string | QueryFunc) {
  if (typeof query === 'string' && !hasQuery(editor, query)) {
    throw new Error(`Query ${query} is not registered.`);
  }

  return (...args: Parameters<F>): ReturnType<F> => editor.query(query, ...args);
}
