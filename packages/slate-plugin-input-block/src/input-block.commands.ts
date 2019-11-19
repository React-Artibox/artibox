import { Editor, Plugin, Block } from 'slate';
import { INPUT_BLOCK_COMMAND_START, INPUT_BLOCK_COMMAND_END } from './input-block.constants';
import { InputBlockQuerieCurrentBlock } from './input-block.queries';

export interface InputBlockCommandStartConfig {
  onConfirm: (editor: Editor, value: string) => Editor | void;
}

export interface InputBlockCommandsConfig {
  type: string;
  queryCurrentBlock: InputBlockQuerieCurrentBlock;
}

export type InputBlockCommandStart = (editor: Editor, config: InputBlockCommandStartConfig) => Editor;
export type InputBlockCommandEnd = (editor: Editor) => Editor;

export type InputBlockCommands = Plugin['commands'] & {
  [INPUT_BLOCK_COMMAND_START]: InputBlockCommandStart;
  [INPUT_BLOCK_COMMAND_END]: InputBlockCommandEnd;
};

export function InputBlockCommands(config: InputBlockCommandsConfig): InputBlockCommands {
  const { type, queryCurrentBlock } = config;

  return {
    [INPUT_BLOCK_COMMAND_START](editor, config) {
      const { isExpanded } = editor.value.selection;

      const block = Block.fromJSON({ type, data: config });

      if (isExpanded) {
        return editor.delete().insertBlock(block);
      } else if (editor.value.startBlock.text === '') {
        return editor.setBlocks(block);
      }

      return editor.insertBlock(block);
    },
    [INPUT_BLOCK_COMMAND_END]: editor => {
      const block = queryCurrentBlock(editor);
      return block ? editor.removeNodeByKey(block.key) : editor;
    }
  };
}
