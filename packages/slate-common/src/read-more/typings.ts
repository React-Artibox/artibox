import { Editor } from 'slate';
import { Withable } from '../typings/with';
import { ReadMoreElement } from './common';

export interface ReadMore extends Withable {
  type: string;
  createReadMoreElement(): ReadMoreElement;
  insertReadMore(editor: Editor): void;
}
