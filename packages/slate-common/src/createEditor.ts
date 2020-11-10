import { createEditor as createSlateEditor } from 'slate';
import { withHistory } from 'slate-history';

export function createEditor() {
  return withHistory(createSlateEditor());
}
