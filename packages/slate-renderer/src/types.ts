import { Editor } from 'slate';
import { RenderAttributes } from 'slate-react';
import { ReactHTML, ComponentType } from 'react';

export interface EditorPassable {
  editor: Editor;
}

export type RendererBaseComponent = keyof ReactHTML | ComponentType<RenderAttributes>;
