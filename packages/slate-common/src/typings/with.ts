import { Editor } from 'slate';

export interface Withable<R = undefined> {
  /**
   * The decorator for editor.
   */
  with: <T extends Editor>(editor: T) => R extends undefined ? T : T & R;
}
