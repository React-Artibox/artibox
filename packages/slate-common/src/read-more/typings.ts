import { Editor } from 'slate';
import { WithElementType } from '../typings/element';
import { Withable } from '../typings/with';
import { ReadMoreElement } from './common';

export interface ReadMore extends WithElementType, Withable {
  createReadMoreElement(): ReadMoreElement;
  insertReadMore(editor: Editor): void;
}
