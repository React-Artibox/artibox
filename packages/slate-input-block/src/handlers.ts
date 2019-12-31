import { Editor } from 'slate';
import { Plugin, getEventTransfer } from 'slate-react';
import { isHotkey } from 'is-hotkey';
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
        /**
         * To cancel the input process.
         */
        event.preventDefault();
        return controller.cancel(editor);
      } else if (isHotkey('mod+a', event as any)) {
        const block = controller.getCurrent(editor);

        /**
         * Override original behavior of select all.
         * Only select the text in input block if current selection is in input block.
         */
        if (block) {
          event.preventDefault();
          return editor.moveToRangeOfNode(block);
        }
      }

      return next();
    },
    /**
     * Disable drop event if in input block.
     */
    onDrop(event, editorComponent, next) {
      const editor = (editorComponent as any) as Editor;

      if (!controller.isSelectionIn(editor)) {
        return next();
      }

      event.preventDefault();
      return editor;
    },
    /**
     * Only get the text.
     */
    onPaste(event, editorComponent, next) {
      const editor = (editorComponent as any) as Editor;

      if (!controller.isSelectionIn(editor)) {
        return next();
      }

      event.preventDefault();
      const transfer = getEventTransfer(event);
      return ['html', 'text'].includes(transfer.type) ? editor.insertText((transfer as any).text) : editor;
    }
  };
}
