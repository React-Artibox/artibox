import { Commands } from '@artibox/slate-core';

export interface ToggleMarkCommandsConfig<CA, CR, CT> {
  type: string;
  commandAdd: CA;
  commandRemove: CR;
  commandToggle: CT;
}

export function ToggleMarkCommands<CA, CR, CT>(config: ToggleMarkCommandsConfig<CA, CR, CT>): Commands<CA | CR | CT> {
  const { type, commandAdd, commandRemove, commandToggle } = config;
  return new Commands<CA | CR | CT>([
    [commandAdd, editor => editor.addMark(type).focus()],
    [commandRemove, editor => editor.removeMark(type).focus()],
    [commandToggle, editor => editor.toggleMark(type).focus()]
  ]);
}
