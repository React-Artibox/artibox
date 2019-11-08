import { Editor } from 'slate';
import { MouseEventHandler } from 'react';
import { IconDefinition } from '@artibox/icons';
import { TOOLBAR_DIVIDER } from './toolbar.constants';

export type ToolUseOnMouseDown = (editor: Editor) => MouseEventHandler;
export type ToolUseIsActive = (editor: Editor) => boolean;

export type Tool = TOOLBAR_DIVIDER | [IconDefinition, [ToolUseOnMouseDown, ToolUseIsActive] | [ToolUseOnMouseDown]];
