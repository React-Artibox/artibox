import { Editor, QueryFunc } from 'slate';

export function getQuery(editor: Editor, queryName: string) {
  const query: QueryFunc | undefined = (editor as any)[queryName];

  if (!query) {
    throw new Error(`Query ${queryName} is not registered.`);
  }

  return <A extends any[]>(...args: A) => editor.query(query, ...args);
}
