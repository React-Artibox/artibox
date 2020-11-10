import { Editor } from 'slate';
import { Withable } from '../typings/with';

export interface Blockquote extends Withable {
  type: string;
  isSelectionInBlockquote(editor: Editor): boolean;
  toggleBlockquote(editor: Editor): void;
}
