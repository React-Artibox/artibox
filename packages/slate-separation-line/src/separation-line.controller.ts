import { Editor } from 'slate';
import { HasNodeType, PARAGRAPH_TYPE } from '@artibox/slate-common';

export abstract class SeparationLineController implements HasNodeType {
  constructor(public readonly type: string) {}

  add = (editor: Editor): Editor =>
    editor
      .insertBlock(this.type)
      .insertBlock(PARAGRAPH_TYPE)
      .moveToStartOfBlock();
}
