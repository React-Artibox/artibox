import React from 'react';
import { CommonEditorRenderer } from '@artibox/slate-renderer';
import { Tool } from './toolbar.types';
import Toolbar from './components/toolbar';
import './styles';

export interface ToolbarPluginConfig {
  collapsedTools?: Tool[];
  expandedTools?: Tool[];
  disabledBlocks?: string[];
}

export type ToolbarPlugin = CommonEditorRenderer;

export function ToolbarPlugin(config: ToolbarPluginConfig): ToolbarPlugin {
  const { collapsedTools, expandedTools, disabledBlocks } = config;

  return CommonEditorRenderer({
    render: (editor, el) => {
      if (disabledBlocks && editor.value.blocks.some(block => disabledBlocks.includes(block!.type))) {
        return el;
      }

      return (
        <>
          {el}
          <Toolbar collapsedTools={collapsedTools} expandedTools={expandedTools} editor={editor} />
        </>
      );
    }
  });
}
