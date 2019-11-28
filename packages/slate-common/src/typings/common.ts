import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import { ToolHook } from './tool';

export interface WithEditor {
  editor: Editor;
}

export interface NodeType {
  type: string;
}

export interface ForPlugin<C, M extends boolean = false> {
  forPlugin(config?: C): M extends true ? Plugin[] : Plugin;
}

export interface ForToolHook<C> {
  forToolHook(config?: C): ToolHook;
}
