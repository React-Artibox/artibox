import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { InputBlockController } from './controller';

export interface CreateInputBlockHandlersConfig {
  controller: InputBlockController;
}

export function createInputBlockHandlers(config: CreateInputBlockHandlersConfig): Plugin {
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
