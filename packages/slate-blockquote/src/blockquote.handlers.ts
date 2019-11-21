import { PickPluginAndRequired, PARAGRAPH_TYPE } from '@artibox/slate-core';
import { isKeyHotkey } from 'is-hotkey';
import { BlockquoteController } from './blockquote.interfaces';

export type BlockquoteHandlers = PickPluginAndRequired<'onKeyDown'>;

export function BlockquoteHandlers(hotkey: string, blockquoteController: BlockquoteController): BlockquoteHandlers {
  /**
   * The handler of soft break.
   */
  const onSoftBreak: BlockquoteHandlers['onKeyDown'] = (event, editor, next) => {
    const blockquoteBlock = blockquoteController.getCurrentBlockquote(editor);

    if (!blockquoteBlock) {
      return next();
    }

    event.preventDefault();

    return editor.splitBlock().setBlocks(PARAGRAPH_TYPE);
  };

  /**
   * If the focused block inside blockquote is w/o any texts, unwrap the focused block.
   */
  const onEnter: BlockquoteHandlers['onKeyDown'] = (event, editor, next) => {
    const blockquoteBlock = blockquoteController.getCurrentBlockquote(editor);
    const currentBlock = editor.value.startBlock;

    if (!blockquoteBlock || currentBlock.text.length !== 0) {
      return next();
    }

    event.preventDefault();

    return blockquoteController.unwrapBlockquoteBlock(editor);
  };

  /**
   * If the focused block inside blockquote and the selection is not expanded, unwrap the focused block.
   */
  const onBackSpace: BlockquoteHandlers['onKeyDown'] = (event, editor, next) => {
    const blockquoteBlock = blockquoteController.getCurrentBlockquote(editor);
    const { isExpanded, start } = editor.value.selection;

    if (!blockquoteBlock || isExpanded || start.offset !== 0) {
      return next();
    }

    event.preventDefault();

    return blockquoteController.unwrapBlockquoteBlock(editor);
  };

  return {
    onKeyDown(event, editor, next) {
      if (event.key === 'Enter') {
        if (event.shiftKey) {
          return onSoftBreak(event, editor, next);
        }

        return onEnter(event, editor, next);
      } else if (event.key === 'Backspace') {
        return onBackSpace(event, editor, next);
      } else if (isKeyHotkey(hotkey, event as any)) {
        return blockquoteController.toggleBlockquoteBlock(editor);
      }

      return next();
    }
  };
}
