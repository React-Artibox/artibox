import { CommandFunc } from 'slate';
import { Commands } from '@artibox/slate-core';

export interface ToggleMarkCommandsConfig<CA extends string, CR extends string, CT extends string> {
  type: string;
  commandAdd: CA;
  commandRemove: CR;
  commandToggle: CT;
}

export type ToggleMarkCommands<CA extends string, CR extends string, CT extends string> = Commands<CA | CR | CT>;

export function ToggleMarkCommands<CA extends string, CR extends string, CT extends string>(
  config: ToggleMarkCommandsConfig<CA, CR, CT>
): ToggleMarkCommands<CA, CR, CT> {
  const { type, commandAdd, commandRemove, commandToggle } = config;

  const addMark: CommandFunc = editor => editor.addMark(type);
  const removeMark: CommandFunc = editor => editor.removeMark(type);
  const toggleMark: CommandFunc = editor => editor.toggleMark(type);

  return {
    [commandAdd]: addMark,
    [commandRemove]: removeMark,
    [commandToggle]: toggleMark
  } as ToggleMarkCommands<CA, CR, CT>;
}
