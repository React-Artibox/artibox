import { DragEvent, ClipboardEvent } from 'react';
import { Editor as CoreEditor, Range } from 'slate';
import { Editor, Plugin, getEventTransfer } from 'slate-react';
import { isImageUrl } from '@artibox/utils/is-image-url';
import { ImageController } from './controller';

function insertImage(editor: CoreEditor, controller: ImageController, src: string, range: Range | null) {
  if (range) {
    editor.select(range);
  }

  return controller.add(editor, src);
}

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
      return isImageUrl(text) ? insertImage(editor, controller, text, range) : next();
    }

    if (type === 'files') {
      const files: File[] = (transfer as any).files;
      const imageFiles = files.filter(file => file.type.split('/')[0] === 'image');

      if (!imageFiles.length) {
        return next();
      }

      imageFiles.forEach(imageFile => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          if (typeof reader.result === 'string') {
            insertImage(editor, controller, reader.result, range);
          }
        });
        reader.readAsDataURL(imageFile);
      });

      return editor;
    }

    return next();
  };

  return { onDrop: onDropOrPaste, onPaste: onDropOrPaste };
}
