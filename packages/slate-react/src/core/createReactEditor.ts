import { withReact } from 'slate-react';
import { createEditor } from '@artibox/slate-common';

export function createReactEditor() {
  return withReact(createEditor());
}
