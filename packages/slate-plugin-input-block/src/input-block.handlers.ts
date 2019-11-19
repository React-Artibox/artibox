import { PickPluginAndRequired } from '@artibox/slate-core';
import { InputBlockQueryIsSelectionInInputBlock } from './input-block.queries';
import { InputBlockCommandCancel, InputBlockCommandConfirm } from './input-block.commands';

export interface InputBlockHandlersConfig {
  queryIsSelectionInInputBlock: InputBlockQueryIsSelectionInInputBlock;
  commandCancel: InputBlockCommandCancel;
  commandConfirm: InputBlockCommandConfirm;
}

export type InputBlockHandlers = PickPluginAndRequired<'onKeyDown' | 'onPaste'>;

export function InputBlockHandlers(config: InputBlockHandlersConfig): InputBlockHandlers {
  const { queryIsSelectionInInputBlock, commandCancel, commandConfirm } = config;

  return {
    onKeyDown(event, editor, next) {
      if (!queryIsSelectionInInputBlock(editor)) {
        return next();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        return commandConfirm(editor);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        return commandCancel(editor);
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
