import { DragEvent, ClipboardEvent } from 'react';
import { Editor as CoreEditor } from 'slate';
import { Editor, Plugin, getEventTransfer } from 'slate-react';
import { isHotkey } from 'is-hotkey';
import { isImageUrl } from '@artibox/utils/is-image-url';
import { readFileAsDataURL } from '@artibox/utils/read-file-as-data-url';
import { ImageController } from './controller';

export interface CreateImageHandlersConfig {
  controller: ImageController;
}

export function createImageHandlers(config: CreateImageHandlersConfig): Plugin {
  const { controller } = config;
  const onDropOrPaste = (event: DragEvent | ClipboardEvent, editorComponent: Editor, next: () => any) => {
    const editor = (editorComponent as any) as CoreEditor;
    const range = editorComponent.findEventRange(event);
    const transfer = getEventTransfer(event);
    const { type } = transfer;

    if (['html', 'text'].includes(type)) {
      const text: string = (transfer as any).text;
      return isImageUrl(text) ? controller.insert(editor, text, { range }) : next();
    }

    if (type === 'files') {
      const files: File[] = (transfer as any).files;
      const imageFiles = files.filter(file => file.type.split('/')[0] === 'image');

      if (!imageFiles.length) {
        return next();
      }

      imageFiles.forEach(imageFile =>
        readFileAsDataURL(imageFile).then(dataURL => controller.insert(editor, dataURL, { range }))
      );

      return editor;
    }

    return next();
  };

  return {
    onKeyDown(event, editorComponent, next) {
      const editor = (editorComponent as any) as Editor;
      const { selection, startBlock } = editor.value;
      const { isCollapsed, start } = selection;

      if (controller.isNodeAsCaption(startBlock)) {
        /**
         * Override original behavior of select all.
         * Only select the text in image caption if current selection is in image caption.
         */
        if (isCollapsed && isHotkey('mod+a', event as any)) {
          event.preventDefault();
          return editor.moveToRangeOfNode(startBlock);
          /**
           * Prevent native backspace and enter event.
           */
        } else if (
          (isCollapsed && event.key === 'Backspace' && start.offset === 0) ||
          (event.key === 'Enter' && !event.shiftKey)
        ) {
          event.preventDefault();
          return editor;
        }
      }

      return next();
    },
    onDrop: onDropOrPaste,
    onPaste: onDropOrPaste
  };
}
