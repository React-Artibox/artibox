import { Editor } from 'slate';

export interface EditorPassable {
  editor: Editor;
}

export interface HasNodeType {
  type: string;
}
