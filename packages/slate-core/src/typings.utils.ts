import { Editor } from 'slate';

/**
 * @example
 *
 * type T = [number, string, object];
 * type RT = RemoveFirstFromTuple<T> === [string, object];
 */
export type RemoveFirstFromTuple<T extends any[]> = ((...b: T) => any) extends (a: any, ...b: infer I) => any ? I : [];

/**
 * @example
 *
 * type QueryHas = (editor: Editor, data: object) => boolean;
 * type RQueryHas = RemoveEditorOnFirstParamIfNeed<QueryHas> === (data: object) => boolean;
 */
export type RemoveEditorOnFirstParamIfNeed<F extends (...args: any[]) => any, R> = (
  ...args: Parameters<F>[0] extends Editor ? RemoveFirstFromTuple<Parameters<F>> : Parameters<F>
) => R;
