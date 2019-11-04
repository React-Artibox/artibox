import { Plugin } from 'slate-react';
import { isHotkey } from 'is-hotkey';
import { BlockquoteQueryCurrentBlock } from './blockquote.queries';
import { BlockquoteCommandSoftBreak, BlockquoteCommandUnwrap, BlockquoteCommandToggle } from './blockquote.commands';

export interface BlockquoteHandlersConfig {
  hotkey: string;
  queryCurrentBlock: BlockquoteQueryCurrentBlock;
  commandSoftBreak: BlockquoteCommandSoftBreak;
  commandUnwrap: BlockquoteCommandUnwrap;
  commandToggle: BlockquoteCommandToggle;
}

export interface BlockquoteHandlers {
  onKeyDown: NonNullable<Plugin['onKeyDown']>;
}

export function BlockquoteHandlers(config: BlockquoteHandlersConfig): BlockquoteHandlers {
  const { hotkey, queryCurrentBlock, commandSoftBreak, commandUnwrap, commandToggle } = config;
  const isSaveHotkey = isHotkey(hotkey);

  /**
   * The handler of soft break.
   */
  const onModEnter: NonNullable<Plugin['onKeyDown']> = (event, editor, next) => {
    const blockquoteBlock = queryCurrentBlock(editor);

    if (!blockquoteBlock) {
      return next();
    }

    event.preventDefault();

    return commandSoftBreak(editor);
  };

  /**
   * If the focused block inside blockquote is w/o any texts, unwrap the focused block.
   */
  const onEnter: NonNullable<Plugin['onKeyDown']> = (event, editor, next) => {
    const blockquoteBlock = queryCurrentBlock(editor);
    const currentBlock = editor.value.startBlock;

    if (!blockquoteBlock || currentBlock.text.length !== 0) {
      return next();
    }

    event.preventDefault();

    return commandUnwrap(editor);
  };

  /**
   * If the focused block inside blockquote and the selection is not expanded, unwrap the focused block.
   */
  const onBackSpace: NonNullable<Plugin['onKeyDown']> = (event, editor, next) => {
    const blockquoteBlock = queryCurrentBlock(editor);
    const { isExpanded, start } = editor.value.selection;

    if (!blockquoteBlock || isExpanded || start.offset !== 0) {
      return next();
    }

    event.preventDefault();

    return commandUnwrap(editor);
  };

  return {
    onKeyDown: (event, editor, next) => {
      if (event.key === 'Enter') {
        if (event.metaKey) {
          return onModEnter(event, editor, next);
        }

        return onEnter(event, editor, next);
      } else if (event.key === 'Backspace') {
        return onBackSpace(event, editor, next);
      } else if (isSaveHotkey(event as any)) {
        return commandToggle(editor);
      }

      return next();
    }
  };
}
