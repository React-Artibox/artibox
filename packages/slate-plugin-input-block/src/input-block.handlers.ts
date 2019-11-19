import { isHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { InputBlockQueryCurrentBlock, InputBlockQueryIsSelectionInInputBlock } from './input-block.queries';
import { InputBlockCommandCancel, InputBlockCommandConfirm } from './input-block.commands';

export interface InputBlockHandlersConfig {
  queryCurrentBlock: InputBlockQueryCurrentBlock;
  queryIsSelectionInInputBlock: InputBlockQueryIsSelectionInInputBlock;
  commandCancel: InputBlockCommandCancel;
  commandConfirm: InputBlockCommandConfirm;
}

export type InputBlockHandlers = PickPluginAndRequired<'onKeyDown' | 'onPaste'>;

export function InputBlockHandlers(config: InputBlockHandlersConfig): InputBlockHandlers {
  const { queryCurrentBlock, queryIsSelectionInInputBlock, commandCancel, commandConfirm } = config;
  const isKeySelectAll = isHotkey('cmd+a');

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
      } else if (isKeySelectAll(event as any)) {
        const block = queryCurrentBlock(editor);

        if (block) {
          event.preventDefault();
          return editor.moveToRangeOfNode(block);
        }
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
