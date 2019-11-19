import { PickPluginAndRequired } from '@artibox/slate-core';
import { INPUT_BLOCK_DATA_KEY_ON_CONFIRM } from './input-block.constants';
import { InputBlockQueryIsSelectionInInputBlock } from './input-block.queries';
import { InputBlockCommandEnd } from './input-block.commands';

export interface InputBlockHandlersConfig {
  queryIsSelectionInInputBlock: InputBlockQueryIsSelectionInInputBlock;
  commandEnd: InputBlockCommandEnd;
}

export type InputBlockHandlers = PickPluginAndRequired<'onKeyDown' | 'onPaste'>;

export function InputBlockHandlers(config: InputBlockHandlersConfig): InputBlockHandlers {
  const { queryIsSelectionInInputBlock, commandEnd } = config;

  return {
    onKeyDown(event, editor, next) {
      if (!queryIsSelectionInInputBlock(editor)) {
        return next();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const value = editor.value.startBlock.text;
        const onConfirm = editor.value.startBlock.data.get(INPUT_BLOCK_DATA_KEY_ON_CONFIRM);

        return onConfirm(editor.removeNodeByKey(editor.value.startBlock.key), value);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        return commandEnd(editor);
      }

      return next();
    },
    onPaste(event, editor, next) {
      if (!queryIsSelectionInInputBlock(editor)) {
        return next();
      } else {
        event.preventDefault();
        return editor.insertText(event.clipboardData.getData('text'));
      }
    }
  };
}
