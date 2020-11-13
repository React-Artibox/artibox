import { Editor } from 'slate';
import { WithElementType } from '../typings/element';
import { Withable } from '../typings/with';

export interface Blockquote extends WithElementType, Withable {
  isSelectionInBlockquote(editor: Editor): boolean;
  toggleBlockquote(editor: Editor): void;
}
