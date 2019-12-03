import { Editor } from 'slate';
import { Dispatch, SetStateAction } from 'react';
import { LocaleDefinition } from '@artibox/locale';

/**
 * The minimum configuration of input for link, embed, ...etc.
 */
export type InputConfig = {
  getPlaceholder: (locale: LocaleDefinition) => string;
  onConfirm: (editor: Editor, value: string) => Editor;
};

export type SetInputConfig = Dispatch<SetStateAction<InputConfig | null>>;
