import { Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';

export interface SeparationLineController {
  /**
   * Insert the separation block to editor.
   */
  insert(editor: Editor): Editor;
}

export type CreateSeparationLineControllerConfig = NodeType;

export function createSeparationLineController(config: CreateSeparationLineControllerConfig): SeparationLineController {
  const { type } = config;
  return {
    insert: editor => editor.insertBlock(type).insertBlock(PARAGRAPH_TYPE).moveToStartOfBlock()
  };
}
