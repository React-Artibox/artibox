import { Editor, CommandFunc } from 'slate';

export function hasCommand(editor: Editor, commandName: string) {
  return commandName in editor;
}

export function getCommand<F extends (...args: any[]) => Editor>(editor: Editor, commandName: string) {
  if (!hasCommand(editor, commandName)) {
    throw new Error(`Command ${commandName} is not registered.`);
  }

  const command: CommandFunc = (editor as any)[commandName];

  return (...args: Parameters<F>): Editor => editor.command(command, ...args);
}
