import { Editor } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';

export interface SeparationLineUtils {
  addSeparationLine: (editor: Editor) => Editor;
}

export function SeparationLineUtils(type: string): SeparationLineUtils {
  const addSeparationLine: SeparationLineUtils['addSeparationLine'] = editor =>
    editor
      .insertBlock(type)
      .insertBlock(PARAGRAPH_TYPE)
      .moveToStartOfBlock();

  return { addSeparationLine };
}
