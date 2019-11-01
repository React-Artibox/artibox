import { Editor } from 'slate';

export type ComposeQueryFunc<Q extends (...args: any[]) => any> = (
  editor: Editor,
  ...args: Parameters<Q>
) => ReturnType<Q>;
export type ComposeCommandFunc<C extends (...args: any[]) => any> = ReturnType<C> extends Editor
  ? (editor: Editor, ...args: Parameters<C>) => Editor
  : never;
