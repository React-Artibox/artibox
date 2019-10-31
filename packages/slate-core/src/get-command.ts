import { Editor, CommandFunc } from 'slate';

export function getCommand<F extends (...args: any[]) => Editor>(editor: Editor, commandName: string) {
  const command: CommandFunc | undefined = (editor as any)[commandName];

  if (!command) {
    throw new Error(`Command ${commandName} is not registered.`);
  }

  return (...args: Parameters<F>): Editor => editor.command(command, ...args);
}
