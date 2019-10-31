import { CommandFunc } from 'slate';
import { HeadingQueryHas } from './heading.queries';

export interface HeadingCommandsConfig<CE extends string, CT extends string> {
  type: string;
  queryHas: HeadingQueryHas;
  commandEnd: CE;
  commandToggle: CT;
}

export type HeadingCommands<C extends string> = {
  [c in C]: CommandFunc;
};

export function HeadingCommands<CE extends string, CT extends string>(
  config: HeadingCommandsConfig<CE, CT>
): HeadingCommands<CE | CT> {
  const { type, queryHas, commandEnd, commandToggle } = config;
  const commands = {} as HeadingCommands<CE | CT>;

  commands[commandEnd] = editor => {
    const currentBlock = editor.value.startBlock;

    if (currentBlock.type !== type) {
      return editor.focus();
    }

    return editor
      .splitBlock()
      .setBlocks('paragraph')
      .focus();
  };
  commands[commandToggle] = editor => editor.setBlocks(queryHas(editor) ? 'paragraph' : type).focus();

  return commands;
}
