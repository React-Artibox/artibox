import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import { ListController } from './controller';

export interface CreateListHandlersConfig {
  controller: ListController;
}

export function createListHandlers(config: CreateListHandlersConfig): Plugin {
  const { controller } = config;

  const onEnter: Plugin['onKeyDown'] = (event, editorComponent, next) => {
    event.preventDefault();

    const editor = (editorComponent as any) as Editor;
    const { selection, startBlock } = editor.value;

    /**
     * To simulate the default behavior of enter event, since the `event.preventDefault` called.
     */
    if (selection.isExpanded) {
      editor.delete();
    }

    const item = controller.getCurrentItem(editor);

    if (!item) {
      return next();
    } else if (selection.start.offset === 0 && startBlock.text === '' && item.nodes.size! <= 1) {
      return controller.decreaseItemDepthOrUnwrapIfNeed(editor);
    }

    /**
     * Split the text into two items.
     */
    return editor.splitDescendantsByKey(item.key, selection.start.key, selection.start.offset);
  };

  const onBackspace: Plugin['onKeyDown'] = (event, editorComponent, next) => {
    const editor = (editorComponent as any) as Editor;
    const { selection } = editor.value;

    if (selection.isExpanded || selection.start.offset !== 0) {
      return next();
    }

    event.preventDefault();
    return controller.decreaseItemDepthOrUnwrapIfNeed(editor);
  };

  const onTab: Plugin['onKeyDown'] = (event, editorComponent) => {
    event.preventDefault();
    const editor = (editorComponent as any) as Editor;
    return event.shiftKey ? controller.decreaseItemDepth(editor) : controller.increaseItemDepth(editor);
  };

  return {
    onKeyDown: (event, editor, next) => {
      if (!controller.isSelectionIn((editor as any) as Editor)) {
        return next();
      } else if (event.key === 'Enter' && !event.shiftKey) {
        return onEnter(event, editor, next);
      } else if (event.key === 'Backspace') {
        return onBackspace(event, editor, next);
      } else if (event.key === 'Tab') {
        return onTab(event, editor, next);
      }

      return next();
    }
  };
}
