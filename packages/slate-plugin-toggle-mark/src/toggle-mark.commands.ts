import { Editor } from 'slate';

export type ToggleMarkCommandAdd = (editor: Editor) => Editor;
export type ToggleMarkCommandRemove = (editor: Editor) => Editor;
export type ToggleMarkCommandToggle = (editor: Editor) => Editor;

export interface ToggleMarkCommandsConfig {
  type: string;
  commandAdd: string;
  commandRemove: string;
  commandToggle: string;
}

export interface ToggleMarkCommands {
  [c: string]: ToggleMarkCommandAdd | ToggleMarkCommandRemove | ToggleMarkCommandToggle;
}

export function ToggleMarkCommands(config: ToggleMarkCommandsConfig): ToggleMarkCommands {
  const { type, commandAdd, commandRemove, commandToggle } = config;
  return {
    [commandAdd]: editor => editor.addMark(type).focus(),
    [commandRemove]: editor => editor.removeMark(type).focus(),
    [commandToggle]: editor => editor.toggleMark(type).focus()
  };
}
