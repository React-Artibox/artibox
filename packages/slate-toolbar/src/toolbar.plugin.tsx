import React from 'react';
import { CommonEditorRenderer } from '@artibox/slate-renderer';
import { Tool } from './toolbar.types';
import Toolbar from './components/toolbar';
import './styles';

export interface ToolbarPluginConfig {
  collapsedTools?: Tool[];
  expandedTools?: Tool[];
}

export type ToolbarPlugin = CommonEditorRenderer;

export function ToolbarPlugin(config: ToolbarPluginConfig): ToolbarPlugin {
  const { collapsedTools, expandedTools } = config;

  return CommonEditorRenderer({
    render: (editor, el) => (
      <>
        {el}
        <Toolbar collapsedTools={collapsedTools} expandedTools={expandedTools} editor={editor} />
      </>
    )
  });
}
