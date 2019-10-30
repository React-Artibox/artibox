import { CommandFunc } from 'slate';

export interface ToggleMarkCommandsConfig<CA extends string, CR extends string, CT extends string> {
  type: string;
  commandAdd: CA;
  commandRemove: CR;
  commandToggle: CT;
}

export type ToggleMarkCommands<C extends string> = {
  [c in C]: CommandFunc;
};

export function ToggleMarkCommands<CA extends string, CR extends string, CT extends string>(
  config: ToggleMarkCommandsConfig<CA, CR, CT>
): ToggleMarkCommands<CA | CR | CT> {
  const { type, commandAdd, commandRemove, commandToggle } = config;
  const commands = {} as ToggleMarkCommands<CA | CR | CT>;

  commands[commandAdd] = editor => editor.addMark(type).focus();
  commands[commandRemove] = editor => editor.removeMark(type).focus();
  commands[commandToggle] = editor => editor.toggleMark(type).focus();

  return commands;
}
