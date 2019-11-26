import { Editor } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import { PickPluginAndRequired } from '@artibox/slate-common';
import { InputBlockController } from './input-block.controller';

export interface InputBlockHandlersConfig {
  controller: InputBlockController;
}

export type InputBlockHandlers = PickPluginAndRequired<'onKeyDown' | 'onPaste'>;

export function InputBlockHandlers(config: InputBlockHandlersConfig): InputBlockHandlers {
  const { controller } = config;

  return {
    onKeyDown(event, editorComponent, next) {
      const editor = (editorComponent as any) as Editor;

      if (!controller.isSelectionIn(editor)) {
        return next();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        return controller.confirm(editor);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        return controller.cancel(editor);
      } else if (isKeyHotkey('cmd+a', event as any)) {
        const block = controller.getCurrent(editor);

        if (block) {
          event.preventDefault();
          return editor.moveToRangeOfNode(block);
        }
      }

      return next();
    },
    onPaste(event, editorComponent, next) {
      const editor = (editorComponent as any) as Editor;

      if (!controller.isSelectionIn(editor)) {
        return next();
      } else {
        event.preventDefault();
        return editor.insertText(event.clipboardData.getData('text'));
      }
    }
  };
}
