import { withReact } from 'slate-react';
import { createEditor } from '@artibox/slate-common';

/**
 * To create a slate react editor w/ history.
 */
export function createReactEditor() {
  return withReact(createEditor());
}
