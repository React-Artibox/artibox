import { Editor, QueryFunc } from 'slate';

export function hasQuery(editor: Editor, queryName: string) {
  return queryName in editor;
}

export function getQuery<F extends (...args: any[]) => any>(editor: Editor, queryName: string) {
  if (!hasQuery(editor, queryName)) {
    throw new Error(`Query ${queryName} is not registered.`);
  }

  const query: QueryFunc = (editor as any)[queryName];

  return (...args: Parameters<F>): ReturnType<F> => editor.query(query, ...args);
}
