import { Editor, QueryFunc } from 'slate';

export function getQuery<F extends (...args: any[]) => any>(editor: Editor, queryName: string) {
  const query: QueryFunc | undefined = (editor as any)[queryName];

  if (!query) {
    throw new Error(`Query ${queryName} is not registered.`);
  }

  return (...args: Parameters<F>): ReturnType<F> => editor.query(query, ...args);
}
