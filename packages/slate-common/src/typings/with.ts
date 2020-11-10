import { Editor } from 'slate';

export interface Withable<R = undefined> {
  with: <T extends Editor>(editor: T) => R extends undefined ? T : T & R;
}
