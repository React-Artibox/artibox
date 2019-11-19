import { Editor } from 'slate';

export interface InputBlockData {
  onConfirm: (editor: Editor, value: string) => Editor;
}
