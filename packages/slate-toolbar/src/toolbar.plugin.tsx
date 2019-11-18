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
    render: (editor, el) => {
      const { fragment, selection } = editor.value;
      const { isFocused, isExpanded } = selection;
      const focusTextEmpty = fragment.text === '';

      if (!isFocused) {
        return el;
      }

      if (isExpanded && !focusTextEmpty && expandedTools) {
        return (
          <>
            {el}
            <Toolbar tools={expandedTools} editor={editor} expanded />
          </>
        );
      } else if (!isExpanded && collapsedTools) {
        return (
          <>
            {el}
            <Toolbar tools={collapsedTools} editor={editor} />
          </>
        );
      }

      return el;
    }
  });
}
