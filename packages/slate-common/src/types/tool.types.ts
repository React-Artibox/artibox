import { Editor } from 'slate';
import { Dispatch, SetStateAction, MouseEventHandler } from 'react';

export type ToolInput = {
  onConfirm: (editor: Editor, value: string) => Editor;
};

export type SetToolInput = Dispatch<SetStateAction<ToolInput | null>>;

export type ToolHook = (
  editor: Editor,
  setToolInput: SetToolInput
) => {
  active?: boolean;
  onMouseDown: MouseEventHandler;
};
