import { Editor } from 'slate';
import { HasNodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph.constants';

export abstract class SeparationLineController implements HasNodeType {
  constructor(public readonly type: string) {}

  add = (editor: Editor): Editor =>
    editor
      .insertBlock(this.type)
      .insertBlock(PARAGRAPH_TYPE)
      .moveToStartOfBlock();
}
