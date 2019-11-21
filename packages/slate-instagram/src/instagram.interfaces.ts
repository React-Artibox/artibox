import { Block, Editor } from 'slate';

export interface InstagramController {
  createInstagramBlock(url: string): Block;
  addInstagramBlock(editor: Editor, embedCode: string): Editor;
}
