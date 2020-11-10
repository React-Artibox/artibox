import { Editor, Node } from 'slate';
import { EditorNodesOptions } from '../typings/editor';
import { unhangRange, UnhangRangeOptions } from '../transforms/unhangRange';

export type GetNodesOptions = EditorNodesOptions & UnhangRangeOptions;

export function getNodes<T extends Node>(editor: Editor, options: GetNodesOptions = {}) {
  unhangRange(editor, options);
  return Editor.nodes<T>(editor, options);
}
