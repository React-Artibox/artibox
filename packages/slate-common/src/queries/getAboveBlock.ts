import { Ancestor, Editor, NodeEntry } from 'slate';
import { EditorAboveOptions } from '../typings/editor';

export type GetAboveBlockOptions = EditorAboveOptions;

/**
 * Get the block above a location.
 * If not found, return the editor entry.
 */
export function getAboveBlock<T extends Ancestor>(editor: Editor, options: GetAboveBlockOptions = {}): NodeEntry<T> {
  const { match } = options;
  const aboveBlock = Editor.above<T>(editor, {
    ...options,
    match: node => Editor.isBlock(editor, node) && (!match || match(node))
  });
  return (aboveBlock || [editor, []]) as NodeEntry<T>;
}
