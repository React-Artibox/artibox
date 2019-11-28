import { Editor } from 'slate';
import { MouseEventHandler } from 'react';
import { SetInputData } from './input';

export type ToolHook = (
  editor: Editor,
  setInputData: SetInputData
) => {
  active?: boolean;
  onMouseDown: MouseEventHandler;
};
