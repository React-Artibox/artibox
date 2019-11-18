import { Editor } from 'slate';
import { MouseEvent } from 'react';
import { IconDefinition } from '@artibox/icons';
import { TOOLBAR_DIVIDER } from './toolbar.constants';

export type ToolOnMouseDown = (editor: Editor, event: MouseEvent) => void;
export type ToolIsActive = (editor: Editor) => boolean;
export interface ToolInputable {
  onConfirm: (editor: Editor, value: string) => void;
}

export type ToolConfig = {
  onMouseDown?: ToolOnMouseDown;
  isActive?: ToolIsActive;
  inputable?: ToolInputable;
};

export type Tool = TOOLBAR_DIVIDER | [IconDefinition, ToolConfig];
