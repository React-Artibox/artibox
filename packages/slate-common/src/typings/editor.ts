import { Editor } from 'slate';

type ExtractEditorMethodOptions<K extends keyof typeof Editor, I extends number> = NonNullable<
  Parameters<typeof Editor[K]>[I]
>;

export type EditorAboveOptions = ExtractEditorMethodOptions<'above', 1>;
export type EditorBeforeOptions = ExtractEditorMethodOptions<'before', 2>;
export type EditorNodesOptions = ExtractEditorMethodOptions<'nodes', 1>;
export type EditorParentOptions = ExtractEditorMethodOptions<'parent', 2>;
export type EditorUnhangRangeOptions = ExtractEditorMethodOptions<'unhangRange', 2>;
