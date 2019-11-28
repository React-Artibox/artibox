import { ReactNode } from 'react';
import { Editor } from 'slate';
import { Plugin } from 'slate-react';

export interface CreateCommonEditorRendererConfig {
  render: (editor: Editor, el: ReactNode) => ReactNode;
}

export function createCommonEditorRenderer(config: CreateCommonEditorRendererConfig): Plugin {
  const { render } = config;

  return {
    renderEditor: (_, editor, next) => render(editor, next())
  };
}
