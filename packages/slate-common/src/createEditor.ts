import { createEditor as createSlateEditor } from 'slate';
import { withHistory } from 'slate-history';

/**
 * To create a slate editor w/ history.
 */
export function createEditor() {
  return withHistory(createSlateEditor());
}
