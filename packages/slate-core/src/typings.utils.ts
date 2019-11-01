import { Editor } from 'slate';

export type RemoveFirstFromTuple<T extends any[]> = ((...b: T) => any) extends (a: any, ...b: infer I) => any ? I : [];

export type RemoveEditorOnFirstParamIfNeed<F extends (...args: any[]) => any, R> = (
  ...args: Parameters<F>[0] extends Editor ? RemoveFirstFromTuple<Parameters<F>> : Parameters<F>
) => R;
