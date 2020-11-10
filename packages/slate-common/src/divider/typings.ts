import { Editor } from 'slate';
import { Withable } from '../typings/with';
import { DividerElement } from './common';

export interface Divider extends Withable {
  type: string;
  createDividerElement(): DividerElement;
  insertDivider(editor: Editor): void;
}
