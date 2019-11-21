import { isKeyHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { InputBlockController } from './input-block.interfaces';

export type InputBlockHandlers = PickPluginAndRequired<'onKeyDown' | 'onPaste'>;

export function InputBlockHandlers(inputBlockController: InputBlockController): InputBlockHandlers {
  return {
    onKeyDown(event, editor, next) {
      if (!inputBlockController.isSelectionInInputBlock(editor)) {
        return next();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        return inputBlockController.confirmInputBlock(editor);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        return inputBlockController.cancelInputBlock(editor);
      } else if (isKeyHotkey('cmd+a', event as any)) {
        const block = inputBlockController.getCurrentInputBlock(editor);

        if (block) {
          event.preventDefault();
          return editor.moveToRangeOfNode(block);
        }
      }

      return next();
    },
    onPaste(event, editor, next) {
      if (!inputBlockController.isSelectionInInputBlock(editor)) {
        return next();
      } else {
        event.preventDefault();
        return editor.insertText(event.clipboardData.getData('text'));
      }
    }
  };
}
