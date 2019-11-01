import { Editor, CommandFunc } from 'slate';
import { RemoveEditorOnFirstParamIfNeed } from './typings.utils';

export type Command<C extends (...args: any[]) => Editor> = RemoveEditorOnFirstParamIfNeed<C, Editor>;

export function hasCommand(editor: Editor, commandName: string) {
  return commandName in editor && typeof (editor as any)[commandName] === 'function';
}

export function getCommand<C extends (...args: any[]) => Editor>(
  editor: Editor,
  command: string | CommandFunc
): Command<C> {
  if (typeof command === 'string' && !hasCommand(editor, command)) {
    throw new Error(`Command ${command} is not registered.`);
  }

  return (...args) => editor.command(command, ...args);
}
