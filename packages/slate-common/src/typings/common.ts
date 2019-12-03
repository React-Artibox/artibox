import { Editor } from 'slate';
import { Plugin } from 'slate-react';

export interface WithEditor {
  editor: Editor;
}

export interface NodeType {
  type: string;
}

export interface Hotkey {
  hotkey: string;
}

/**
 * A factory for creating plugin(s) for `slate-react`.
 *
 * @typeparam C - configuration type.
 * @typeparam M - Determine if the return of factory method is multiple.
 */
export interface ForPlugin<C, M extends boolean = false> {
  forPlugin(config?: C): M extends true ? Plugin[] : Plugin;
}
