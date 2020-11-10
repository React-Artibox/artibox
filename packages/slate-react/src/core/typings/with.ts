import { ReactEditor } from 'slate-react';

export interface ReactWithable<R = undefined> {
  with: <T extends ReactEditor>(editor: T) => R extends undefined ? T : T & R;
}
