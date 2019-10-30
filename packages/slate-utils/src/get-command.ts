import { Editor, CommandFunc } from 'slate';

export function getCommand(editor: Editor, commandName: string) {
  const command: CommandFunc | undefined = (editor as any)[commandName];

  if (!command) {
    throw new Error(`Command ${commandName} is not registered.`);
  }

  return <A extends any[]>(...args: A) => editor.command(command, ...args);
}
