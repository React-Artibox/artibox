import { Editor } from 'slate';
import { getAboveBlock } from './getAboveBlock';

/**
 * Is the selection focus at the start or end of its parent block.
 *
 * @returns
 * Indicate which edge the selection at.
 */
export function isSelectionAtBlockEdge(editor: Editor): 'start' | 'end' | undefined {
  const { selection } = editor;

  if (selection) {
    const [, path] = getAboveBlock(editor, { at: selection });

    if (Editor.isStart(editor, selection.focus, path)) {
      return 'start';
    } else if (Editor.isEnd(editor, selection.focus, path)) {
      return 'end';
    }
  }
}
