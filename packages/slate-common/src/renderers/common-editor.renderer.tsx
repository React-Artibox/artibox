import { ReactNode } from 'react';
import { Editor } from 'slate';
import { PickPluginAndRequired } from '../types/plugin.types';

export interface CommonEditorRendererConfig {
  render: (editor: Editor, el: ReactNode) => ReactNode;
}

export type CommonEditorRenderer = PickPluginAndRequired<'renderEditor'>;

export function CommonEditorRenderer(config: CommonEditorRendererConfig): CommonEditorRenderer {
  const { render } = config;

  return {
    renderEditor: (_, editor, next) => render(editor, next())
  };
}
