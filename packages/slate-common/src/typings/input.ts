import { Editor } from 'slate';
import { Dispatch, SetStateAction } from 'react';
import { LocaleDefinition } from '@artibox/locale';

export type InputData = {
  getPlaceholder: (locale: LocaleDefinition) => string;
  onConfirm: (editor: Editor, value: string) => Editor;
};

export type SetInputData = Dispatch<SetStateAction<InputData | null>>;
