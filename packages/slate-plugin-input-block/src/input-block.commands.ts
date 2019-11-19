import { Editor, Plugin, Block } from 'slate';
import {
  INPUT_BLOCK_DATA_KEY_ON_CONFIRM,
  INPUT_BLOCK_COMMAND_START,
  INPUT_BLOCK_COMMAND_CANCEL,
  INPUT_BLOCK_COMMAND_CONFIRM
} from './input-block.constants';
import { InputBlockData } from './input-block.types';
import { InputBlockQuerieCurrentBlock } from './input-block.queries';

export interface InputBlockCommandsConfig {
  type: string;
  queryCurrentBlock: InputBlockQuerieCurrentBlock;
}

export type InputBlockCommandStart = (editor: Editor, data: InputBlockData) => Editor;
export type InputBlockCommandCancel = (editor: Editor) => Editor;
export type InputBlockCommandConfirm = (editor: Editor) => Editor;

export type InputBlockCommands = Plugin['commands'] & {
  [INPUT_BLOCK_COMMAND_START]: InputBlockCommandStart;
  [INPUT_BLOCK_COMMAND_CANCEL]: InputBlockCommandCancel;
  [INPUT_BLOCK_COMMAND_CONFIRM]: InputBlockCommandConfirm;
};

export function InputBlockCommands(config: InputBlockCommandsConfig): InputBlockCommands {
  const { type, queryCurrentBlock } = config;
  const commandStart: InputBlockCommandStart = (editor, data) => {
    const { isExpanded } = editor.value.selection;
    const block = Block.fromJSON({ type, data });

    if (isExpanded) {
      return editor.delete().insertBlock(block);
    } else if (editor.value.startBlock.text === '') {
      return editor.setBlocks(block);
    }

    return editor.insertBlock(block);
  };
  const commandCancel: InputBlockCommandCancel = editor => {
    const block = queryCurrentBlock(editor);
    return block ? editor.removeNodeByKey(block.key) : editor;
  };

  const commandConfirm: InputBlockCommandConfirm = editor => {
    const block = queryCurrentBlock(editor);

    if (!block) {
      return editor;
    }

    const { text, data } = block;
    const onConfirm: InputBlockData['onConfirm'] = data.get(INPUT_BLOCK_DATA_KEY_ON_CONFIRM);
    return onConfirm(commandCancel(editor), text);
  };

  return {
    [INPUT_BLOCK_COMMAND_START]: commandStart,
    [INPUT_BLOCK_COMMAND_CANCEL]: commandCancel,
    [INPUT_BLOCK_COMMAND_CONFIRM]: commandConfirm
  };
}
