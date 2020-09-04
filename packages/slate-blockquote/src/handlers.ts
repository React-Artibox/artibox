import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import { isHotkey } from 'is-hotkey';
import { Hotkey } from '@artibox/slate-common';
import { BlockquoteController } from './controller';

/**
 * @property hotkey - Toggle blockquote while the hotkey pressed.
 */
export interface CreateBlockquoteHandlersConfig extends Hotkey {
  controller: BlockquoteController;
}

export function createBlockquoteHandlers(config: CreateBlockquoteHandlersConfig): Plugin {
  const { hotkey, controller } = config;

  /**
   * If the focused block inside blockquote is w/o any texts, unwrap the focused block.
   */
  const onEnter: Plugin['onKeyDown'] = (event, editorComponent, next) => {
    const editor = (editorComponent as any) as Editor;
    const blockquoteBlock = controller.getCurrent(editor);
    const currentBlock = editor.value.startBlock;

    if (!blockquoteBlock || currentBlock.text.length !== 0) {
      return next();
    }

    event.preventDefault();

    return controller.unwrap(editor);
  };

  /**
   * If the focused block inside blockquote and the selection is not expanded, unwrap the focused block.
   */
  const onBackSpace: Plugin['onKeyDown'] = (event, editorComponent, next) => {
    const editor = (editorComponent as any) as Editor;
    const blockquoteBlock = controller.getCurrent(editor);
    const { isExpanded, start } = editor.value.selection;

    if (!blockquoteBlock || isExpanded || start.offset !== 0) {
      return next();
    }

    event.preventDefault();

    return controller.unwrap(editor);
  };

  return {
    onKeyDown(event, editor, next) {
      if (event.key === 'Enter' && !event.shiftKey) {
        return onEnter(event, editor, next);
      } else if (event.key === 'Backspace') {
        return onBackSpace(event, editor, next);
      } else if (isHotkey(hotkey, event as any)) {
        return controller.toggle((editor as any) as Editor);
      }

      return next();
    }
  };
}
