import { Editor } from 'slate';
import { MouseEvent } from 'react';
import { IconDefinition } from '@artibox/icons';
import { InputBlockData } from '@artibox/slate-plugin-input-block';
import { TOOLBAR_DIVIDER } from './toolbar.constants';

export type ToolOnMouseDown = (editor: Editor, event: MouseEvent) => void;
export type ToolIsActive = (editor: Editor) => boolean;
export type ToolInputable = InputBlockData;

export type ToolConfig = {
  onMouseDown?: ToolOnMouseDown;
  isActive?: ToolIsActive;
  inputable?: ToolInputable;
};

export type Tool = TOOLBAR_DIVIDER | [IconDefinition, ToolConfig];
