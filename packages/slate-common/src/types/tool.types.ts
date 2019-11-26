import { Editor } from 'slate';
import { Dispatch, SetStateAction, MouseEventHandler } from 'react';
import { LocaleDefinition } from '@artibox/locale';

export type ToolInput = {
  getPlaceholder: (locale: LocaleDefinition) => string;
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
