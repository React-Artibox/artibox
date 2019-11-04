import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { SEPARATION_LINE_COMMAND_ADD } from './separation-line.constants';

export type SeparationLineCommandAdd = (editor: Editor) => Editor;

export type SeparationLineCommands = Plugin['commands'] & {
  [SEPARATION_LINE_COMMAND_ADD]: SeparationLineCommandAdd;
};

export function SeparationLineCommands(type: string): SeparationLineCommands {
  return {
    [SEPARATION_LINE_COMMAND_ADD]: editor =>
      editor
        .insertBlock(type)
        .insertBlock(PARAGRAPH_TYPE)
        .moveToStartOfBlock()
        .focus()
  };
}
