import { Editor, Location, Range } from 'slate';
import { getAboveBlock, GetAboveBlockOptions } from './getAboveBlock';

export type GetRangeBeforeFromAboveBlockStartOptions = Omit<GetAboveBlockOptions, 'at'>;

/**
 * Get the range from the start of the block above location to the start of location.
 */
export function getRangeBeforeFromAboveBlockStart(
  editor: Editor,
  at: Location,
  options: GetRangeBeforeFromAboveBlockStartOptions = {}
): Range {
  const [, path] = getAboveBlock(editor, { ...options, at });
  const anchor = Editor.start(editor, path);
  const focus = Editor.start(editor, at);

  return { anchor, focus };
}
