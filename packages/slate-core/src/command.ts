import { Editor, CommandFunc } from 'slate';

export function hasCommand(editor: Editor, commandName: string) {
  return commandName in editor && typeof (editor as any)[commandName] === 'function';
}

export function getCommand<F extends (...args: any[]) => Editor>(editor: Editor, command: string | CommandFunc) {
  if (typeof command === 'string' && !hasCommand(editor, command)) {
    throw new Error(`Command ${command} is not registered.`);
  }

  return (...args: Parameters<F>): Editor => editor.command(command, ...args);
}
