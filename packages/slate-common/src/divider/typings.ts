import { Editor } from 'slate';
import { WithElementType } from '../typings/element';
import { Withable } from '../typings/with';
import { DividerElement } from './common';

export interface Divider extends WithElementType, Withable {
  createDividerElement(): DividerElement;
  insertDivider(editor: Editor): void;
}
